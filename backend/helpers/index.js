const os = require('os');
const fs = require('fs');
const { spawn } = require('child_process');
const httpStatus = require('http-status');

const initFile = (fileName, type) => {
    type = ["lex", "box", "pareto"]?.includes(type) ? type : "lex";
    const content = `;; activate model generation\n(set-option :produce-models true)\n(set-option :opt.priority ${type})\n\n`;
    fs.writeFileSync(fileName, content);

    return content;
};

const declareGoalsAndRefinements = (fileName, model) => {
    let content = ";;%%%%\n;Declaration of Goal, Assumption and Refinement Propostions\n;%%%%\n";

    let goalNodes = [];
    let refinementLinks = [];
    let junctionNodes = [];
    let signleAndRefinementLinks = [];
    let contributionLinks = [];

    // get "or refinement" and single "and refinement" links
    model.linkDataArray = model?.linkDataArray?.map((link) => {
        if(link?.type === "Refinement") {
            const updatedLink = { ...link, label: `R${refinementLinks?.length + signleAndRefinementLinks?.length + 1}` };
            refinementLinks.push(updatedLink);
            return updatedLink;
        }

        if(link?.category === "ANDRefinement" && link?.fromArrow === "Backward") {
            const toNode = model?.nodeDataArray?.find(n => n?.key === link?.to);
            if(toNode?.category !== "Junction") {
                const updatedLink = { ...link, label: `R${refinementLinks?.length + signleAndRefinementLinks?.length + 1}` };
                signleAndRefinementLinks.push(updatedLink);
                return updatedLink;
            }
        }

        return link;
    })
    
    // get goal nodes and "and refinement" junctions
    model.nodeDataArray = model?.nodeDataArray?.map((node, index) => {
        if(node?.category === "Junction") {
            const updatedNode = { 
                ...node, 
                label: `R${refinementLinks?.length + signleAndRefinementLinks?.length + junctionNodes?.length + 1}`
            };
            junctionNodes.push(updatedNode);
            return updatedNode;
        } else {
            const goalKey = Math.abs(node?.key)?.toFixed(0);
            const goalLabel = `G${goalKey}`;
            const updatedNode = { ...node, label: goalLabel };
            goalNodes.push(updatedNode)
            return updatedNode;
        }
    });

    // get contribution links
    model.linkDataArray = model?.linkDataArray?.map(link => {
        const contributionTypes = ["C-", "C+", "V-", "V+"];
        let valueContributionCount = 0;
        let costContributionCount = 0;

        if(contributionTypes.includes(link.type)) {
            let linkLabel = "";
            if(link.type === "V-" || link.type === "V+") {
                valueContributionCount += 1;
                linkLabel = `VCL${valueContributionCount}`
            }
            if(link.type === "C-" || link.type === "C+") {
                costContributionCount += 1;
                linkLabel = `CCL${costContributionCount}`
            }

            const contributionId = link.type === "V-" ? "NVC" : link.type === "V+" ? "PVC" : link.type === "C-" ? "NCC" : "PCC";

            const updatedLink = { ...link, label: linkLabel, contribution_id: contributionId };
            contributionLinks.push(updatedLink);
            return updatedLink;
        } else {
            return link;
        }
    });

    const combined = [...goalNodes, ...refinementLinks, ...junctionNodes, ...signleAndRefinementLinks, ...contributionLinks];

    combined?.forEach(item => {
        const line = `(declare-fun ${item?.label} () Bool)\n`;
        content = content + line;
    });
    content = content + "\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content;
};

const closeWorld = (fileName, model) => {
    let content = ";;%%%%\n;Close-world\n;%%%%\n";

    const goalNodes = model?.nodeDataArray?.filter(node => node?.category !== "Junction");

    goalNodes?.forEach(node => {
        const orRefinements = model?.linkDataArray?.filter(link => {
            return link?.type === "Refinement" && link?.from === node?.key;
        });

        let andRefinements = []

        model?.linkDataArray?.forEach(link => {
            if(link?.category === "ANDRefinement" && link?.fromArrow === "Backward" && link?.from === node?.key) {
                const toNode = model?.nodeDataArray?.find(node => node?.key === link?.to);

                if(toNode?.category === "Junction") {
                    andRefinements.push(toNode);
                }

                andRefinements.push(link);
            }
        });

        const combined = [...orRefinements, ...andRefinements];

        if(combined?.length > 0) {
            const refinementLabels = combined?.map(l => l?.label)?.join(" ");
            content = content + `(assert (=> ${node?.label} (or ${refinementLabels} )))\n`;
        }
    });
    content = content + "\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content;
};

const refinementGoalRelationships = (fileName, model) => {
    let content = ";;%%%%\n;Refinement-Goal relationships\n;%%%%\n";

    model?.linkDataArray?.forEach(link => {
        if(link?.label && link?.label?.slice(0, 1) === "R") {
            const toNode = model?.nodeDataArray?.find(n => n?.key === link?.to);
            const fromNode = model?.nodeDataArray?.find(n => n?.key === link?.from);
            
            if(fromNode?.label && toNode?.label)
                content = content + `(assert (and (= ${link?.label} (and ${toNode?.label} )) (=> ${link?.label} ${fromNode?.label} )))\n`;
        }
    });

    model?.nodeDataArray?.forEach(node => {
        if(node?.category === "Junction") {
            const parentLink = model?.linkDataArray?.find(l => {
                return l?.category === "ANDRefinement" && l?.fromArrow === "Backward" && l?.to === node?.key;
            });
            const parentNode = model?.nodeDataArray?.find(n => n?.key === parentLink?.from);

            if(!parentNode) return;

            const childrenLinks = model?.linkDataArray?.filter(l => {
                return l?.category === "ANDRefinement" && l?.fromArrow !== "Backward" && l?.to === node?.key;
            });
            const childrenNodes = model?.nodeDataArray?.filter(n => childrenLinks?.map(l => l?.from)?.includes(n?.key));
            const childrenLabels = childrenNodes?.map(n => n?.label)?.filter(n => !!n)?.join(" ");

            content = content + `(assert (and (= ${node?.label} (and ${childrenLabels} )) (=> ${node?.label} ${parentNode?.label} )))\n`;
        }
    })

    content = content + "\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content;
};

const exclusionFinder = (fileName, model) => {
    let content = ";;%%%%\n;Exclusion\n;%%%%\n";
    model?.nodeDataArray?.forEach(node => {
        if(node?.category === "Exclusion") {

            const exclusionLinks = model?.linkDataArray?.filter(l => {
                return l?.from === node.key;
            });
            const nodes = exclusionLinks.map((l)=> { 
                return model?.nodeDataArray?.find((n)=> {
                    return n.key === l.to;
                })
            })
            content = content + `(assert (not (and ${nodes.map((n) => n.label).join(" ")})))\n`;
        }
    })

    content = content + "\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content;
}

const mandatoryNodes = (fileName, model) => {
    let content = ";;%%%%\n;Mandatory goals\n;%%%%\n";

    model?.nodeDataArray?.forEach(node => {
        if(node?.is_mandatory) {
            content = content + `(assert ${node?.label})\n`;
        }
    });

    content = content + "\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content; 
};

const implementedNodes = (fileName, model) => {
    let content = ";;%%%%\n;Implemented goals\n;%%%%\n";

    model?.nodeDataArray?.forEach(node => {
        if(node?.is_implemented && !node?.is_mandatory) {
            content = content + `(assert ${node?.label})\n`;
        }
    });

    content = content + "\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content;
};

const contributions = (fileName, model) => {
    let content = ";;%%%%\n;Contributions\n;%%%%\n";

    model?.linkDataArray?.forEach(link => {
        if(link.contribution_id) {
            const fromNode = model?.nodeDataArray?.find(n => n?.key === link?.from);
            const toNode = model?.nodeDataArray?.find(n => n?.key === link?.to);

            const linkWeight = link.value || 1;

            content = content + `(assert (= ${link.label} (and ${fromNode?.label} ${toNode?.label})))\n`;
            content = content + `(assert-soft (not ${link.label}) :weight ${linkWeight} :id ${link.contribution_id})\n`;
        }
    });

    content = content + "\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content;
}

const goalAttributes = (fileName, model) => {
    let content = ";;%%%%\n;Goal Attributes\n;%%%%\n";

    model.nodeDataArray?.filter((node) => node?.category !== "Exclusion").forEach(node => {
        if(node.label.slice(0, 1) === "G") {
            content = content + `(assert-soft (not ${node.label}) :weight ${node.cost || 1} :id cost)\n`;
            content = content + `(assert-soft (not ${node.label}) :weight ${node.value || 1} :id value)\n`;

            if(node?.attributes?.length > 0) {
                node?.attributes?.forEach(attr => {
                    if(attr?.type === "integer") {
                        content = content + `(assert-soft (not ${node.label}) :weight ${attr.value || 1} :id ${attr.key})\n`;
                    }
                })
            }
        }
    });

    content = content + "\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content;
}

const leafAndRootNodes = (fileName, model) => {
    
    const leafNodeLabels = [];
    const rootNodeLabels = []

    model.nodeDataArray?.forEach(node => {
        if(node.label.slice(0, 1) === "G") {
            let parentRefinementLink = null;
            let parentSingleAndrefinementLink = null;
            let parentJunctionLink = null;

            let childRefinementLink = null;
            let childSingleAndRefinementLink = null;
            let childJunctionLink = null;

            for (const l of model.linkDataArray) {
                if(l.type === "Refinement" && l.to === node.key && l.fromArrow === "BackwardTriangle" && l.toArrow === "") {
                    parentRefinementLink = l;
                }
                if(l.type === "AND Refinement" && l.to === node.key && l.fromArrow === "Backward" && l.toArrow === "") {
                    parentSingleAndrefinementLink = l;
                }
                if(l.type === "AND Refinement" && l.from === node.key && l.fromArrow === "" && l.toArrow === "") {
                    parentJunctionLink = l;
                }

                if(l.type === "Refinement" && l.from === node.key && l.fromArrow === "BackwardTriangle" && l.toArrow === "") {
                    childRefinementLink = l;
                }
                if(l.type === "AND Refinement" && l.from === node.key && l.fromArrow === "Backward" && l.toArrow === "") {
                    childSingleAndRefinementLink = l;
                }
                if(l.type === "AND Refinement" && l.from === node.key && l.fromArrow === "Backward" && l.toArrow === "") {
                    childJunctionLink = l;
                }
            }

            if(
                (parentRefinementLink || parentSingleAndrefinementLink || parentJunctionLink) &&
                (!(childRefinementLink || childSingleAndRefinementLink || childJunctionLink))
            ) {
                leafNodeLabels.push(node.label);
            }

            if(!(parentRefinementLink || parentSingleAndrefinementLink || parentJunctionLink)) {
                rootNodeLabels.push(node.label);
            }
        }
    });

    let content = ";;%%%%\n;Leaf Nodes\n;%%%%\n";
    leafNodeLabels.forEach(l => {
        content = content + `(assert-soft (not ${l} ) :id sat_tasks)\n`;
    });

    content = content + "\n;;%%%%\n;Root Nodes\n;%%%%\n";
    rootNodeLabels.forEach(l => {
        content = content + `(assert-soft (not ${l} ) :id unsat_requirements)\n`;
    });

    content = content + "\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content;
}

const precedenceRelationships = (fileName, model) => {
    let content = ";;%%%%\n;Precedence relationships\n;%%%%\n";

    model?.linkDataArray?.forEach(link => {
        if(link?.type === "Precedence") {
            const toNode = model?.nodeDataArray?.find(n => n?.key === link?.to);
            const fromNode = model?.nodeDataArray?.find(n => n?.key === link?.from);

            if(fromNode?.label && toNode?.label)
                content = content + `(assert (=> ${fromNode?.label} ${toNode?.label}))\n`;
        }
    });

    content = content + "\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content;
};

const optimizeCriteria = (fileName, criteria, minUnsatReq, minSatTask) => {
    let content = ";;%%\n;;Optimization:\n;;%%\n";

    criteria?.filter(criterion => !criterion?.smt && !criterion?.contribution)?.forEach(criterion => {
        content += `(declare-fun ${criterion?.key}.auto () Real)\n`;
        content += `(assert (= ${criterion?.key}.auto (- ${criterion?.key} 0)))\n`;
    });

    content += "\n";

    criteria?.forEach(criterion => {
        if(criterion?.min_range) {
            content += `(assert (and (> ${criterion?.key}.auto ${criterion?.min_range})))\n`;
        }
        if(criterion?.max_range) {
            content += `(assert (and (< ${criterion?.key}.auto ${criterion?.max_range})))\n`;
        }
    });

    content += "\n";

    for(const criterion of criteria) {
        if(criterion?.smt) {
            content += `${criterion?.command}\n`;
            continue;
        }

        if(!criterion?.disabled) {
            if(criterion?.min) {
                content += criterion?.contribution ? `(minimize ${criterion?.label})\n` : `(minimize ${criterion?.key}.auto)\n`;
            } else {
                content += criterion?.contribution ? `(maximize ${criterion?.label})\n` : `(maximize ${criterion?.key}.auto)\n`;
            }
        }
    }

    if(minUnsatReq) content += "\n(minimize unsat_requirements)\n";
    if(minSatTask) content += "(minimize sat_tasks)\n\n";

    content += "(check-sat)\n(get-objectives)\n(load-objective-model 1)\n(get-model)\n(exit)\n";

    fs.writeFileSync(fileName, content, { flag: 'a+' });
    return content;
}

const runOptiMathSat = (inputFile, outputFile, res, model) => {
    // program outputs
    let content = "";

    const platform = os.platform();
    let command = 'optimathsat';
    if(platform === 'win32')
        command = 'optimathsat/win32/optimathsat';
    else if(platform === 'darwin')
        command = 'optimathsat/mac/optimathsat'
    else if(platform === 'linux')
        command = 'optimathsat/linux/optimathsat'

    // define the arguments to pass to OptiMathSat
    const args = ["-optimization=true", inputFile];

    // spawn the OptiMathSat process with the input and output files as arguments
    const optiMathSat = spawn(command, args);

    // handle stdout and stderr output from OptiMathSat
    optiMathSat.stdout.on('data', (data) => {
        content = content + data;
    });

    optiMathSat.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // // handle OptiMathSat exit code
    optiMathSat.on('close', (code) => {
        if(code === 0) {
            const objectiveIndex = content.indexOf("(objectives");
            const modelIndex = content.indexOf("(model");

            const objectiveText = content.slice(objectiveIndex, modelIndex);
            const modelText = content.slice(modelIndex);

            const modelExpression = /define-fun G(\d+) \(\) Bool (.*)\)/g;  // new RegExp('some-word(\\d+)', 'i');
            let modelMatch;
            let goalResults = {};

            do {
                modelMatch = modelExpression.exec(modelText);
                if (modelMatch) {
                    goalResults[`G${modelMatch[1]}`] = modelMatch[2];
                }
            } while (modelMatch);

            model.nodeDataArray = model.nodeDataArray?.map(node => {
                if(goalResults[node?.label]) {
                    return {
                        ...node,
                        smt_result: goalResults[node?.label]
                    }
                }
                return node;
            });


            const objectiveExpression = /\((.*)\.auto (\d+)/g;
            let objectiveMatch;
            let objectiveResults = {};

            do {
                objectiveMatch = objectiveExpression.exec(objectiveText);
                if (objectiveMatch) {
                    objectiveResults[`${objectiveMatch[1]}`] = objectiveMatch[2];
                }
            } while (objectiveMatch);

            res.status(httpStatus.OK).send({ model, results: objectiveResults });
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        }

        fs.writeFileSync(outputFile, content);
    });
}

module.exports = {
    initFile,
    declareGoalsAndRefinements,
    closeWorld,
    refinementGoalRelationships,
    mandatoryNodes,
    implementedNodes,
    contributions,
    goalAttributes,
    exclusionFinder,
    leafAndRootNodes,
    precedenceRelationships,
    optimizeCriteria,
    runOptiMathSat
}