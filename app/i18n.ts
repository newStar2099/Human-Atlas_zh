/** Interface language. Anatomical names and descriptions are translated
 * separately, in `terms-zh.json` and `anatomy-zh.ts`, because they come from
 * sources with their own provenance rather than from this file. */
export type Language = 'en'|'zh';
export const LANGUAGES:{id:Language;label:string;direction:'ltr'|'rtl'}[] = [
 {id:'zh',label:'中文',direction:'ltr'},
 {id:'en',label:'English',direction:'ltr'},
];
export const direction = (language:Language) => LANGUAGES.find(l=>l.id===language)?.direction ?? 'ltr';

/** Every piece of interface text, in both languages. */
const TEXT = {
 title:{en:'Human Atlas',zh:'人体图谱'},
 eyebrow:{en:'INTERACTIVE ANATOMY',zh:'交互式解剖'},
 pieces:{en:'modeled pieces',zh:'个建模结构件'},
 referenceBody:{en:'reference body',zh:'参考人体'},
 referenceBodyLabel:{en:'Reference body',zh:'参考人体'},
 language:{en:'Language',zh:'语言'},

 findStructure:{en:'Find a structure',zh:'查找结构'},
 searchAnatomy:{en:'Search anatomy',zh:'搜索解剖结构'},
 findAnatomy:{en:'Find anatomy',zh:'搜索解剖结构'},
 searchNamed:{en:'Search named anatomical structures',zh:'搜索已命名的解剖结构'},
 searchPlaceholder:{en:'Heart, femur, cranial nerve…',zh:'心脏、股骨、脑神经…'},
 closeSearch:{en:'Close search',zh:'关闭搜索'},
 noMatches:{en:'No structures match your search.',zh:'没有与搜索匹配的结构。'},
 searchHintEmpty:{en:'Start with a major organ, or search every named structure.',zh:'从主要器官开始，或搜索所有已命名结构。'},
 searchHintTyping:{en:'Showing up to 80 matches. Refine your search to find smaller structures.',zh:'最多显示 80 个匹配。缩小搜索范围以找到更小的结构。'},
 piece:{en:'piece',zh:'件'},
 pieces_plural:{en:'pieces',zh:'件'},

 systems:{en:'Systems',zh:'系统'},
 anatomicalLayers:{en:'Anatomical layers',zh:'解剖图层'},
 openLayers:{en:'Open system layers',zh:'打开系统图层'},
 closeSystems:{en:'Close systems',zh:'关闭系统'},
 presetAll:{en:'All',zh:'全部'},
 presetSkeleton:{en:'Skeleton',zh:'骨骼'},
 presetOrgans:{en:'Organs',zh:'器官'},
 showOnly:{en:'Show only',zh:'仅显示'},
 show:{en:'Show',zh:'显示'},
 piecesVisible:{en:'pieces visible',zh:'个结构件可见'},
 hideAll:{en:'Hide all',zh:'全部取消'},
 showAll:{en:'Show all',zh:'全部显示'},

 cameraControls:{en:'Camera controls',zh:'相机控制'},
 explorerPanels:{en:'Explorer panels',zh:'探索面板'},
 viewThreeQuarter:{en:'three-quarter view',zh:'四分之三视角'},
 viewFront:{en:'front view',zh:'正面视角'},
 viewSide:{en:'side view',zh:'侧面视角'},
 viewBack:{en:'back view',zh:'背面视角'},
 autoRotate:{en:'Auto rotate',zh:'自动旋转'},
 rotateBody:{en:'Rotate body',zh:'旋转人体'},
 pauseRotation:{en:'Pause rotation',zh:'暂停旋转'},
 reset:{en:'Reset',zh:'重置'},
 resetView:{en:'Reset view and layers',zh:'重置视角与图层'},
 assembleReset:{en:'Assemble and reset',zh:'合并并重置'},

 explode:{en:'Explode anatomy',zh:'分解解剖结构'},
 assembled:{en:'Assembled',zh:'已合并'},
 everyPiece:{en:'Every piece',zh:'所有结构件'},
 inventory:{en:'ANATOMICAL INVENTORY',zh:'解剖清单'},
 separated:{en:'SEPARATED STRUCTURES',zh:'分离的结构'},
 selectedStructure:{en:'SELECTED STRUCTURE',zh:'选中的结构'},

 dragToOrbit:{en:'Drag background to orbit · press the body and drag to move it',zh:'拖拽空白处环绕 · 按住人体可拖动位置'},
 dragToPan:{en:'Drag to pan · grab any piece and drag',zh:'拖拽平移 · 按住结构件可拖动'},
 pinchToZoom:{en:'Pinch to zoom',zh:'捏合以缩放'},
 tapToInspect:{en:'Tap to inspect',zh:'点按以查看'},

 anatomy:{en:'ANATOMY',zh:'解剖'},
 atlasReference:{en:'Atlas reference',zh:'图谱参考'},
 selectedPieces:{en:'Selected pieces',zh:'选中的结构件'},
 includedStructures:{en:'Included structures',zh:'包含的结构'},
 andMore:{en:'more modeled pieces.',zh:'个其他建模结构件。'},
 and:{en:'And',zh:'以及'},
 systemOverview:{en:'System overview · structure identified from source anatomy',zh:'系统概述 · 结构识别自源解剖数据'},
 isolate:{en:'Isolate structure',zh:'隔离结构'},
 showSurrounding:{en:'Show surrounding anatomy',zh:'显示周围解剖结构'},
 clearSelection:{en:'Clear selection',zh:'清除选择'},
 viewSource:{en:'View anatomical source',zh:'查看解剖来源'},

 aboutThisAtlas:{en:'About this atlas',zh:'关于本图谱'},
 sourceScope:{en:'SOURCE & SCOPE',zh:'来源与范围'},
 aboutTitle:{en:'A body, revealed.',zh:'展现人体。'},
 aboutIntro:{en:'Explore the adult',zh:'探索成年人'},
 aboutIntroFrom:{en:'reference anatomy from',zh:'参考解剖，来自'},
 shared:{en:'The two reference bodies come from different projects, so their coverage and level of detail differ. Neither contains every human structure or variation. Named concepts can contain multiple pieces; each source mesh is rendered once.',
        zh:'两具参考人体来自不同项目，覆盖范围与精细程度各不相同。任何一具都不包含全部人体结构或变异。一个命名概念可包含多个结构件；每个源网格只渲染一次。'},
 caveat:{en:'Colors and system groupings are designed for exploration. The geometry is simplified for the web, and short explanations provide general educational context. This is an anatomical reference, not a diagnostic or surgical tool.',
        zh:'配色与系统分组为探索而设计。几何体已为网页简化，简短说明仅供一般教育参考。本图谱是解剖学参考，不是诊断或手术工具。'},
 sourceHeading:{en:'Source',zh:'来源'},
 datasetLicense:{en:'Dataset license',zh:'数据集许可'},
 originalGeometry:{en:'Original geometry & metadata',zh:'原始几何与元数据'},
 readPublication:{en:'Read the source publication',zh:'阅读源文献'},
 sourceCredits:{en:'Source & credits',zh:'来源与致谢'},

 preparing:{en:'Preparing the anatomy',zh:'正在准备解剖数据'},
 loadingBody:{en:'Loading',zh:'加载中'},
 reference:{en:'reference anatomy',zh:'参考解剖'},
 reloadViewer:{en:'Reload viewer',zh:'重新加载查看器'},
 catalogueError:{en:'The anatomy catalogue could not be loaded.',zh:'解剖目录加载失败。'},
 changePassword:{en:'Change password',zh:'修改密码'},
} as const;

export type Phrase = keyof typeof TEXT;
export const say = (language:Language, phrase:Phrase) => TEXT[phrase][language] ?? TEXT[phrase].en;

export const fold = (text:string) => text.toLowerCase().trim();
