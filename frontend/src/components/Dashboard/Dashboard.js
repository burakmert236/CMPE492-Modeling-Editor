import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Select, Input, InputNumber, Space, Checkbox } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { setAttributes as setStateAttributes } from "../../redux/attributesSlice";
import { setLastEdit, setResultsVisible } from "../../redux/optimizeSlice";
import { capitalize } from "../../helpers/functions";
import _ from "lodash";
import * as go from "gojs";

import "./Dashboard.scss";
const { TextArea } = Input;

const Dashboard = ({ selectedNode, diagram }) => {
  const dispatch = useDispatch();

  const { lastSolution, lastEdit } = useSelector((state) => state.optimize);

  const [text, setText] = useState(null); 
  const [value, setValue] = useState(null); 
  const [cost, setCost] = useState(null); 
  const [isMandatory, setIsMandatory] = useState(false);
  const [isImplemented, setIsImplemented] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [attrKey, setAttrKey] = useState('');
  const [attrValue, setAttrValue] = useState('');
  const [currentType, setCurrentType] = useState('integer');
 // const [option, setOption] = useState();

  const setType = (e) => {
    setCurrentType(e);
  };

  const options = [
    {
      value: 'integer',
      label: 'int',
    },
    {
      value: 'string',
      label: 'str',
    },
  ];

  const toggleInput = () => {
    setIsOpen(!isOpen);
    setAttrKey("");
    setAttrValue("");
  };

  function deleteAttribute(key) {
    const attribute = attributes?.find(i => i.key === key);

    setAttributes(attributes?.filter(i => i.key !== key));
    diagram.model.setDataProperty(
      selectedNode?.data, 
      "attributes", 
      selectedNode?.findObject("TEXT")?.attributes?.filter(i => i.key !== key)
    );

    dispatch(setStateAttributes({ attribute, func: "delete" }));
  };

  const changeAttributes = (item, newValue) => {
    setAttributes(attributes?.map(i => {
        if(i?.key !== item?.key) return i;

        return {
          ...i,
          value: newValue
        }
      }),
    )
  };

  const handleAttrKeyChange = (e) => {
    setAttrKey(e.target.value);
  };
  
  const handleAttrValueChange = (e) => {
    setAttrValue(e.target.value);
  };

  const submitAttribute = (key, value, type) => {
    if (!selectedNode?.data?.attributes) {
      diagram.model.setDataProperty(selectedNode?.data, "attributes", []);
    }

    if(attributes?.find(i => i.key === capitalize(key)) || key === "Cost" || key === "Value") {
      alert(`Attribute with the key "${capitalize(key)}" already exists.`)
      return;
    }
    if(type === "Number" && isNaN(+value)) {
      alert(`The value of the attribute has to have type ${type}.`)
      return;
    }
    if(key === "") {
      alert(`The name of the attribute cannot be empty.`)
      return;
    }
    diagram.model.setDataProperty(selectedNode?.data, "attributes", [...selectedNode?.data?.attributes, {key: capitalize(key), value: value, type: type}]);
    setAttributes(a => [...(a || []), {key: capitalize(key), value: value, type: type}]);

    dispatch(setStateAttributes({ attribute: { key: capitalize(key), value: value, type: type }, func: "add"}));

    toggleInput();
  };


  useEffect(() => {
    setText(selectedNode?.data?.text);
    setCost(selectedNode?.data?.cost);
    setValue(selectedNode?.data?.value);
    setAttributes(selectedNode?.data?.attributes);
    setIsMandatory(selectedNode?.data?.is_mandatory);
    setIsImplemented(selectedNode?.data?.is_implemented);
  }, [selectedNode]);

  if(selectedNode?.category === "Exclusion") {
    return (
      <div>
        <p>Select a goal to view its properties</p>
      </div>
    )
  }
    
  return (
    <div className="dashboard-container">
      {selectedNode ? (
        <div className="attributes">
          <h3 className="title">Goal Properties</h3>

          <div className="single-line">
            <span>Text</span>
            <TextArea 
              placeholder={text} 
              rows={1} 
              value={text} 
              onChange={(e) => {
                setText(e.target.value);
                diagram.model.setDataProperty(selectedNode?.data, "text", e.target.value);
                diagram.commitTransaction("text-edit");
              }}
            />
          </div>

          <div className="single-line">
            <span>Cost</span>
            <InputNumber 
              placeholder={"Enter a cost"} 
              value={cost} 
              className="number-input"
              onChange={(e) => {
                setCost(e)
                diagram.model.setDataProperty(selectedNode?.data, "cost", e);
                diagram.commitTransaction("text-edit");
              }}
            />
          </div>

          <div className="single-line">
            <span>Value</span>
            <InputNumber 
              placeholder={"Enter a value"} 
              value={value} 
              className="number-input"
              onChange={(e) => {
                setValue(e)
                diagram.model.setDataProperty(selectedNode?.data, "value", e);
                diagram.commitTransaction("text-edit");
              }}
            />
          </div>

          <div>
            <div>
              <Checkbox 
                checked={isMandatory}
                onChange={e => {
                  diagram.model.setDataProperty(selectedNode?.data, "is_mandatory", e.target.checked);
                  setIsMandatory(e.target.checked);
                }}
              >
                Is Mandatory
              </Checkbox>
            </div>
            <div>
              <Checkbox 
                checked={isImplemented}
                onChange={e => {
                  diagram.model.setDataProperty(selectedNode?.data, "is_implemented", e.target.checked);
                  setIsImplemented(e.target.checked); 
                }}
              >
                Is Implemented
              </Checkbox>
            </div>
          </div>
          
          <div style={{ maxHeight: "140px", overflow: "scroll", margin: "5px 0", display: "flex", gap: "5px", flexDirection: "column" }}>
            {attributes?.map((attr) => (
              <div key={attr.key} className="new-single-line">
                <span>{capitalize(attr.key)}</span>

                { attr?.type === "string" ?
                  <Input 
                    value={attr.value} 
                    onChange={(e) => changeAttributes(attr, e.target.value)}
                  /> : 
                  <InputNumber 
                    style={{ width: "100%" }}
                    value={attr.value} 
                    onChange={(e) => changeAttributes(attr, e)}
                  />
                }

                <Button 
                  onClick={() => deleteAttribute(attr.key)} 
                >
                  <DeleteOutlined className="trash"/>
                </Button>

              </div>
            ))}
          </div>

          {isOpen && (
            <>
              <span className="define-title">Define new property</span>
              <Space.Compact>
                <Select value={currentType} defaultValue="int" options={options} onChange={(e) => setType(e)}></Select>
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                  <Input value={attrKey} placeholder="Name" onChange={handleAttrKeyChange} style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0", borderRight: "none" }}/>
                  {
                    currentType === "string" ? 
                    <Input value={attrValue} placeholder="Value" onChange={handleAttrValueChange} /> :
                    <InputNumber value={attrValue} placeholder="Value" onChange={(e) => setAttrValue(e)} />
                  }
                </div>
              </Space.Compact>
            </>
          )}
          
          { !isOpen ? 
            (
              <Button 
                className="submit-button" 
                onClick={(e) => toggleInput()}
              >
                Add Attribute
              </Button>
            ) : 
            (
              <div className="inline-buttons">
                <Button 
                  className="submit-button" 
                  onClick={() => submitAttribute(attrKey, attrValue, currentType)}
                >
                  Submit
                </Button>
                <Button 
                  className="cancel-button" 
                  onClick={(e) => toggleInput()}
                >
                  Cancel
                </Button>
              </div>
            )
          }

        </div>
      ) : (
        <div>
          <p>Select a goal to view its properties</p>
        </div>
      )}

      { lastSolution?.class &&
        <div>
          <div className="results-button">
            <Button style={{width: "100%"}}  onClick={() => {
              dispatch(setResultsVisible(true));
            }} >See Last Results</Button>
          </div>

          <div className="back-to-last-buttons">
            <div className="back-to-last-button">
              <button type="primary" style={{width: "100%"}}  onClick={() => {
                if(lastEdit) {
                  diagram.model = go.Model.fromJson(JSON.parse(JSON.stringify(lastEdit)));
                }
              }} >Back to last edit</button>
            </div>
            <div className="back-to-last-button">
              <button type="primary" style={{width: "100%"}}  onClick={() => {
                const currentLastEdit = diagram.model.toJson();
                if(_.isEqual(currentLastEdit, lastSolution)) {
                  dispatch(setLastEdit(null));
                } else {
                  dispatch(setLastEdit(currentLastEdit));
                }

                diagram.model = go.Model.fromJson(JSON.parse(JSON.stringify(lastSolution)));
              }} >Back to last solution</button>
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default Dashboard;