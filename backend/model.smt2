;; activate model generation
(set-option :produce-models true)
(set-option :opt.priority lex)

;;%%%%
;Declaration of Goal, Assumption and Refinement Propostions
;%%%%
(declare-fun G1 () Bool)
(declare-fun G2 () Bool)
(declare-fun G3 () Bool)
(declare-fun G4 () Bool)
(declare-fun G5 () Bool)
(declare-fun G7 () Bool)
(declare-fun G8 () Bool)
(declare-fun G9 () Bool)
(declare-fun G10 () Bool)
(declare-fun G11 () Bool)
(declare-fun G13 () Bool)
(declare-fun G14 () Bool)
(declare-fun G15 () Bool)
(declare-fun G16 () Bool)
(declare-fun G17 () Bool)
(declare-fun G18 () Bool)
(declare-fun G19 () Bool)
(declare-fun G20 () Bool)
(declare-fun G21 () Bool)
(declare-fun G22 () Bool)
(declare-fun G23 () Bool)
(declare-fun G24 () Bool)
(declare-fun G26 () Bool)
(declare-fun G27 () Bool)
(declare-fun G28 () Bool)
(declare-fun G29 () Bool)
(declare-fun G30 () Bool)
(declare-fun G32 () Bool)
(declare-fun G33 () Bool)
(declare-fun G34 () Bool)
(declare-fun G35 () Bool)
(declare-fun G36 () Bool)
(declare-fun G37 () Bool)
(declare-fun G38 () Bool)
(declare-fun G39 () Bool)
(declare-fun G40 () Bool)
(declare-fun G41 () Bool)
(declare-fun G42 () Bool)
(declare-fun G44 () Bool)
(declare-fun G45 () Bool)
(declare-fun G46 () Bool)
(declare-fun G47 () Bool)
(declare-fun G48 () Bool)
(declare-fun G50 () Bool)
(declare-fun G51 () Bool)
(declare-fun G52 () Bool)
(declare-fun G53 () Bool)
(declare-fun G54 () Bool)
(declare-fun G57 () Bool)
(declare-fun G58 () Bool)
(declare-fun G59 () Bool)
(declare-fun G60 () Bool)
(declare-fun G61 () Bool)
(declare-fun G63 () Bool)
(declare-fun G64 () Bool)
(declare-fun G65 () Bool)
(declare-fun G66 () Bool)
(declare-fun G67 () Bool)
(declare-fun G69 () Bool)
(declare-fun G70 () Bool)
(declare-fun G71 () Bool)
(declare-fun G72 () Bool)
(declare-fun G73 () Bool)
(declare-fun G74 () Bool)
(declare-fun G75 () Bool)
(declare-fun G76 () Bool)
(declare-fun G77 () Bool)
(declare-fun G78 () Bool)
(declare-fun G79 () Bool)
(declare-fun G81 () Bool)
(declare-fun G82 () Bool)
(declare-fun G83 () Bool)
(declare-fun G84 () Bool)
(declare-fun G85 () Bool)
(declare-fun G87 () Bool)
(declare-fun G88 () Bool)
(declare-fun G89 () Bool)
(declare-fun G90 () Bool)
(declare-fun G91 () Bool)
(declare-fun G92 () Bool)
(declare-fun G93 () Bool)
(declare-fun G94 () Bool)
(declare-fun G95 () Bool)
(declare-fun G96 () Bool)
(declare-fun G97 () Bool)
(declare-fun G98 () Bool)
(declare-fun G100 () Bool)
(declare-fun G101 () Bool)
(declare-fun G102 () Bool)
(declare-fun G103 () Bool)
(declare-fun G104 () Bool)
(declare-fun G106 () Bool)
(declare-fun G107 () Bool)
(declare-fun G108 () Bool)
(declare-fun G109 () Bool)
(declare-fun G110 () Bool)
(declare-fun G112 () Bool)
(declare-fun G113 () Bool)
(declare-fun G114 () Bool)
(declare-fun G115 () Bool)
(declare-fun G116 () Bool)
(declare-fun G118 () Bool)
(declare-fun G119 () Bool)
(declare-fun G120 () Bool)
(declare-fun G121 () Bool)
(declare-fun G122 () Bool)
(declare-fun G124 () Bool)
(declare-fun G125 () Bool)
(declare-fun G126 () Bool)
(declare-fun G127 () Bool)
(declare-fun G128 () Bool)
(declare-fun G129 () Bool)
(declare-fun G130 () Bool)
(declare-fun G131 () Bool)
(declare-fun G132 () Bool)
(declare-fun G133 () Bool)
(declare-fun G134 () Bool)
(declare-fun G136 () Bool)
(declare-fun G137 () Bool)
(declare-fun G138 () Bool)
(declare-fun G139 () Bool)
(declare-fun G140 () Bool)
(declare-fun G142 () Bool)
(declare-fun G143 () Bool)
(declare-fun G144 () Bool)
(declare-fun G145 () Bool)
(declare-fun G146 () Bool)
(declare-fun G147 () Bool)
(declare-fun G148 () Bool)
(declare-fun G149 () Bool)
(declare-fun G150 () Bool)
(declare-fun G151 () Bool)
(declare-fun G152 () Bool)
(declare-fun G153 () Bool)
(declare-fun G155 () Bool)
(declare-fun G156 () Bool)
(declare-fun G157 () Bool)
(declare-fun G158 () Bool)
(declare-fun G159 () Bool)
(declare-fun G161 () Bool)
(declare-fun G162 () Bool)
(declare-fun G163 () Bool)
(declare-fun G164 () Bool)
(declare-fun G165 () Bool)
(declare-fun R1 () Bool)
(declare-fun R2 () Bool)
(declare-fun R5 () Bool)
(declare-fun R6 () Bool)
(declare-fun R7 () Bool)
(declare-fun R8 () Bool)
(declare-fun R9 () Bool)
(declare-fun R10 () Bool)
(declare-fun R13 () Bool)
(declare-fun R14 () Bool)
(declare-fun R15 () Bool)
(declare-fun R16 () Bool)
(declare-fun R17 () Bool)
(declare-fun R20 () Bool)
(declare-fun R21 () Bool)
(declare-fun R22 () Bool)
(declare-fun R23 () Bool)
(declare-fun R26 () Bool)
(declare-fun R27 () Bool)
(declare-fun R28 () Bool)
(declare-fun R29 () Bool)
(declare-fun R30 () Bool)
(declare-fun R33 () Bool)
(declare-fun R34 () Bool)
(declare-fun R35 () Bool)
(declare-fun R36 () Bool)
(declare-fun R37 () Bool)
(declare-fun R38 () Bool)
(declare-fun R41 () Bool)
(declare-fun R42 () Bool)
(declare-fun R43 () Bool)
(declare-fun R44 () Bool)
(declare-fun R47 () Bool)
(declare-fun R48 () Bool)
(declare-fun R49 () Bool)
(declare-fun R50 () Bool)
(declare-fun R51 () Bool)
(declare-fun R54 () Bool)
(declare-fun R55 () Bool)
(declare-fun R56 () Bool)
(declare-fun R57 () Bool)
(declare-fun R58 () Bool)
(declare-fun R59 () Bool)
(declare-fun R62 () Bool)
(declare-fun R63 () Bool)
(declare-fun R64 () Bool)
(declare-fun R65 () Bool)
(declare-fun R66 () Bool)
(declare-fun R67 () Bool)
(declare-fun R68 () Bool)
(declare-fun R69 () Bool)
(declare-fun R70 () Bool)
(declare-fun R71 () Bool)
(declare-fun R72 () Bool)
(declare-fun R73 () Bool)
(declare-fun R74 () Bool)
(declare-fun R75 () Bool)
(declare-fun R76 () Bool)
(declare-fun R77 () Bool)
(declare-fun R78 () Bool)
(declare-fun R79 () Bool)
(declare-fun R80 () Bool)
(declare-fun R81 () Bool)
(declare-fun R82 () Bool)
(declare-fun R83 () Bool)
(declare-fun R84 () Bool)
(declare-fun R85 () Bool)
(declare-fun R3 () Bool)
(declare-fun R4 () Bool)
(declare-fun R11 () Bool)
(declare-fun R12 () Bool)
(declare-fun R18 () Bool)
(declare-fun R19 () Bool)
(declare-fun R24 () Bool)
(declare-fun R25 () Bool)
(declare-fun R31 () Bool)
(declare-fun R32 () Bool)
(declare-fun R39 () Bool)
(declare-fun R40 () Bool)
(declare-fun R45 () Bool)
(declare-fun R46 () Bool)
(declare-fun R52 () Bool)
(declare-fun R53 () Bool)
(declare-fun R60 () Bool)
(declare-fun R61 () Bool)

;;%%%%
;Close-world
;%%%%
(assert (=> G1 (or R1 R2 )))
(assert (=> G3 (or R65  )))
(assert (=> G4 (or R71  )))
(assert (=> G5 (or R3 )))
(assert (=> G9 (or R7 )))
(assert (=> G13 (or R4 )))
(assert (=> G15 (or R66  )))
(assert (=> G17 (or R5 R6 )))
(assert (=> G20 (or R9 R10 )))
(assert (=> G22 (or R67  )))
(assert (=> G24 (or R11 )))
(assert (=> G26 (or R64 )))
(assert (=> G28 (or R8 )))
(assert (=> G32 (or R12 )))
(assert (=> G34 (or R68  )))
(assert (=> G36 (or R13 R14 )))
(assert (=> G38 (or R16 R17 )))
(assert (=> G40 (or R69  )))
(assert (=> G42 (or R18 )))
(assert (=> G46 (or R15 )))
(assert (=> G50 (or R19 )))
(assert (=> G52 (or R70  )))
(assert (=> G54 (or R20 R21 )))
(assert (=> G57 (or R22 R23 )))
(assert (=> G59 (or R73  )))
(assert (=> G61 (or R24 )))
(assert (=> G65 (or R28 )))
(assert (=> G69 (or R25 )))
(assert (=> G71 (or R74  )))
(assert (=> G73 (or R26 R27 )))
(assert (=> G75 (or R29 R30 )))
(assert (=> G77 (or R75  )))
(assert (=> G79 (or R31 )))
(assert (=> G83 (or R35 )))
(assert (=> G87 (or R32 )))
(assert (=> G89 (or R76  )))
(assert (=> G91 (or R33 R34 )))
(assert (=> G94 (or R37 R38 )))
(assert (=> G96 (or R77  )))
(assert (=> G98 (or R39 )))
(assert (=> G102 (or R36 )))
(assert (=> G106 (or R40 )))
(assert (=> G107 (or R72  )))
(assert (=> G108 (or R78  )))
(assert (=> G110 (or R41 R42 )))
(assert (=> G112 (or R43 R44 )))
(assert (=> G114 (or R80  )))
(assert (=> G116 (or R45 )))
(assert (=> G120 (or R49 )))
(assert (=> G124 (or R46 )))
(assert (=> G126 (or R81  )))
(assert (=> G128 (or R47 R48 )))
(assert (=> G130 (or R50 R51 )))
(assert (=> G132 (or R82  )))
(assert (=> G134 (or R52 )))
(assert (=> G138 (or R56 )))
(assert (=> G142 (or R53 )))
(assert (=> G144 (or R83  )))
(assert (=> G146 (or R54 R55 )))
(assert (=> G149 (or R58 R59 )))
(assert (=> G151 (or R84  )))
(assert (=> G153 (or R60 )))
(assert (=> G157 (or R57 )))
(assert (=> G161 (or R61 )))
(assert (=> G162 (or R79  )))
(assert (=> G163 (or R85  )))
(assert (=> G165 (or R62 R63 )))

;;%%%%
;Refinement-Goal relationships
;%%%%
(assert (and (= R1 (and G2 )) (=> R1 G1 )))
(assert (and (= R2 (and G3 )) (=> R2 G1 )))
(assert (and (= R3 (and G8 )) (=> R3 G5 )))
(assert (and (= R4 (and G11 )) (=> R4 G13 )))
(assert (and (= R5 (and G15 )) (=> R5 G17 )))
(assert (and (= R6 (and G16 )) (=> R6 G17 )))
(assert (and (= R7 (and G17 )) (=> R7 G9 )))
(assert (and (= R8 (and G20 )) (=> R8 G28 )))
(assert (and (= R9 (and G21 )) (=> R9 G20 )))
(assert (and (= R10 (and G22 )) (=> R10 G20 )))
(assert (and (= R11 (and G26 )) (=> R11 G24 )))
(assert (and (= R12 (and G29 )) (=> R12 G32 )))
(assert (and (= R13 (and G34 )) (=> R13 G36 )))
(assert (and (= R14 (and G35 )) (=> R14 G36 )))
(assert (and (= R15 (and G38 )) (=> R15 G46 )))
(assert (and (= R16 (and G39 )) (=> R16 G38 )))
(assert (and (= R17 (and G40 )) (=> R17 G38 )))
(assert (and (= R18 (and G44 )) (=> R18 G42 )))
(assert (and (= R19 (and G47 )) (=> R19 G50 )))
(assert (and (= R20 (and G52 )) (=> R20 G54 )))
(assert (and (= R21 (and G53 )) (=> R21 G54 )))
(assert (and (= R22 (and G58 )) (=> R22 G57 )))
(assert (and (= R23 (and G59 )) (=> R23 G57 )))
(assert (and (= R24 (and G64 )) (=> R24 G61 )))
(assert (and (= R25 (and G67 )) (=> R25 G69 )))
(assert (and (= R26 (and G71 )) (=> R26 G73 )))
(assert (and (= R27 (and G72 )) (=> R27 G73 )))
(assert (and (= R28 (and G73 )) (=> R28 G65 )))
(assert (and (= R29 (and G76 )) (=> R29 G75 )))
(assert (and (= R30 (and G77 )) (=> R30 G75 )))
(assert (and (= R31 (and G82 )) (=> R31 G79 )))
(assert (and (= R32 (and G85 )) (=> R32 G87 )))
(assert (and (= R33 (and G89 )) (=> R33 G91 )))
(assert (and (= R34 (and G90 )) (=> R34 G91 )))
(assert (and (= R35 (and G91 )) (=> R35 G83 )))
(assert (and (= R36 (and G94 )) (=> R36 G102 )))
(assert (and (= R37 (and G95 )) (=> R37 G94 )))
(assert (and (= R38 (and G96 )) (=> R38 G94 )))
(assert (and (= R39 (and G100 )) (=> R39 G98 )))
(assert (and (= R40 (and G103 )) (=> R40 G106 )))
(assert (and (= R41 (and G108 )) (=> R41 G110 )))
(assert (and (= R42 (and G109 )) (=> R42 G110 )))
(assert (and (= R43 (and G113 )) (=> R43 G112 )))
(assert (and (= R44 (and G114 )) (=> R44 G112 )))
(assert (and (= R45 (and G119 )) (=> R45 G116 )))
(assert (and (= R46 (and G122 )) (=> R46 G124 )))
(assert (and (= R47 (and G126 )) (=> R47 G128 )))
(assert (and (= R48 (and G127 )) (=> R48 G128 )))
(assert (and (= R49 (and G128 )) (=> R49 G120 )))
(assert (and (= R50 (and G131 )) (=> R50 G130 )))
(assert (and (= R51 (and G132 )) (=> R51 G130 )))
(assert (and (= R52 (and G137 )) (=> R52 G134 )))
(assert (and (= R53 (and G140 )) (=> R53 G142 )))
(assert (and (= R54 (and G144 )) (=> R54 G146 )))
(assert (and (= R55 (and G145 )) (=> R55 G146 )))
(assert (and (= R56 (and G146 )) (=> R56 G138 )))
(assert (and (= R57 (and G149 )) (=> R57 G157 )))
(assert (and (= R58 (and G150 )) (=> R58 G149 )))
(assert (and (= R59 (and G151 )) (=> R59 G149 )))
(assert (and (= R60 (and G155 )) (=> R60 G153 )))
(assert (and (= R61 (and G158 )) (=> R61 G161 )))
(assert (and (= R62 (and G163 )) (=> R62 G165 )))
(assert (and (= R63 (and G164 )) (=> R63 G165 )))
(assert (and (= R64 (and G165 )) (=> R64 G26 )))
(assert (and (= R65 (and G4 G5 G7 )) (=> R65 G3 )))
(assert (and (= R66 (and G13 G14 )) (=> R66 G15 )))
(assert (and (= R67 (and G23 G24 )) (=> R67 G22 )))
(assert (and (= R68 (and G30 G32 G33 )) (=> R68 G34 )))
(assert (and (= R69 (and G41 G42 )) (=> R69 G40 )))
(assert (and (= R70 (and G48 G50 G51 )) (=> R70 G52 )))
(assert (and (= R71 (and R65 G36 G54 )) (=> R71 G4 )))
(assert (and (= R72 (and G57 G75 R78 )) (=> R72 G107 )))
(assert (and (= R73 (and G60 G61 G63 )) (=> R73 G59 )))
(assert (and (= R74 (and G69 G70 )) (=> R74 G71 )))
(assert (and (= R75 (and G78 G79 G81 )) (=> R75 G77 )))
(assert (and (= R76 (and G87 G88 )) (=> R76 G89 )))
(assert (and (= R77 (and G97 G98 )) (=> R77 G96 )))
(assert (and (= R78 (and G104 G106 G107 )) (=> R78 G108 )))
(assert (and (= R79 (and G112 G130 R85 )) (=> R79 G162 )))
(assert (and (= R80 (and G115 G116 G118 )) (=> R80 G114 )))
(assert (and (= R81 (and G124 G125 )) (=> R81 G126 )))
(assert (and (= R82 (and G133 G134 G136 )) (=> R82 G132 )))
(assert (and (= R83 (and G142 G143 )) (=> R83 G144 )))
(assert (and (= R84 (and G152 G153 )) (=> R84 G151 )))
(assert (and (= R85 (and G159 G161 G162 )) (=> R85 G163 )))

;;%%%%
;Mandatory goals
;%%%%
(assert G3)
(assert G15)
(assert G22)
(assert G34)
(assert G40)
(assert G52)
(assert G59)
(assert G71)
(assert G77)
(assert G89)
(assert G96)
(assert G108)
(assert G114)
(assert G126)
(assert G132)
(assert G144)
(assert G151)
(assert G163)

;;%%%%
;Precedence relationships
;%%%%
(assert (=> G2 G7))
(assert (=> G3 G9))
(assert (=> G15 G10))
(assert (=> G16 G18))
(assert (=> G21 G19))
(assert (=> G22 G27))
(assert (=> G34 G28))
(assert (=> G35 G30))
(assert (=> G39 G37))
(assert (=> G40 G45))
(assert (=> G52 G46))
(assert (=> G53 G48))
(assert (=> G58 G63))
(assert (=> G59 G65))
(assert (=> G71 G66))
(assert (=> G72 G74))
(assert (=> G76 G81))
(assert (=> G77 G83))
(assert (=> G89 G84))
(assert (=> G90 G92))
(assert (=> G95 G93))
(assert (=> G96 G101))
(assert (=> G108 G102))
(assert (=> G109 G104))
(assert (=> G113 G118))
(assert (=> G114 G120))
(assert (=> G126 G121))
(assert (=> G127 G129))
(assert (=> G131 G136))
(assert (=> G132 G138))
(assert (=> G144 G139))
(assert (=> G145 G147))
(assert (=> G150 G148))
(assert (=> G151 G156))
(assert (=> G163 G157))
(assert (=> G164 G159))
(assert (=> G24 G58))

;;%%
;;Optimization:
;;%%
(check-sat)
(get-objectives)
(load-objective-model 1)
(get-model)
(exit)
