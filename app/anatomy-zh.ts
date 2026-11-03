/** Chinese wording for the display systems and the reference bodies. The
 * anatomical names live in `terms-zh.json`, and the per-structure descriptions
 * in `explanations-zh.ts`, mirroring the Arabic pipeline. */
import type {SystemId} from './anatomy';

export const SYSTEMS_ZH:Partial<Record<SystemId,{name:string;description:string}>> = {
 'skeletal':{name:'骨骼系统',description:'骨骼构成身体的支撑框架，保护器官，并为肌肉提供附着点。骨的内部组织还储存矿物质并产生血细胞。'},
 'muscular':{name:'肌肉系统',description:'骨骼肌通过牵拉其附着点产生运动。肌肉与肌腱共同活动关节、稳定姿势并产生热量。'},
 'cardiac':{name:'心脏',description:'心脏是一个四腔肌性泵。它的瓣膜引导血液沿肺循环和体循环向前流动。'},
 'sensory':{name:'感觉器官',description:'这些结构参与视觉、听觉和平衡等特殊感觉。它们的特化组织检测刺激，并与神经系统一起传递信息。'},
 'arterial':{name:'动脉',description:'心脏驱动血液循环。动脉把血液从心脏输送到各组织供其营养，或在肺循环中输送到肺。'},
 'venous':{name:'静脉',description:'静脉把血液送回心脏。浅层与深层静脉网从各组织收集血液；肺静脉把含氧血从肺送回心脏。'},
 'nervous':{name:'神经系统',description:'脑、脊髓和周围神经携带并处理信号。它们支持感觉、运动、协调以及身体功能的自动调节。'},
 'brain':{name:'脑区',description:'脑在这里被划分为可逐个选择的区域。每个区域都可以单独隔离显示；脊髓和脑以外的神经仍归神经系统管理。'},
 'respiratory':{name:'呼吸系统',description:'气道把空气输送到肺，氧气和二氧化碳在肺内的空气与血液之间进行交换。呼吸依赖呼吸肌产生的压力变化。'},
 'digestive':{name:'消化系统',description:'消化道分解食物，吸收营养和水分，并把废物向前推进。附属器官贡献胆汁和消化酶。'},
 'urinary':{name:'泌尿系统',description:'肾过滤血液，调节体液、电解质与酸碱平衡。尿液经输尿管进入膀胱，再经尿道排出。'},
 'lymphatic':{name:'淋巴系统',description:'淋巴管把多余的组织液送回血液循环。淋巴结和其他淋巴器官支持免疫监视与免疫应答。'},
 'endocrine':{name:'内分泌系统',description:'内分泌器官向血液释放激素，协调代谢、生长、应激反应和生殖等过程。'},
 'reproductive':{name:'生殖系统',description:'这里展示的生殖结构产生配子和性激素，并提供输送它们的管道。'},
 'pregnancy':{name:'妊娠参考',description:'这里展示的胎盘、胎膜和脐带属于妊娠参考，不属于非妊娠人体。它们默认隐藏，需要您手动开启。'},
 'integumentary':{name:'体表',description:'体表提供外部的解剖参考。皮肤系统构成保护屏障，并参与感觉与体温调节。'},
 'borrowed':{name:'借自男性的骨骼',description:'这些骨骼不属于本参考人体。它们复制自男性参考，用以替代其数据源未建模的结构；每个区域都经过缩放和定位，以与两具人体共有的骨骼对接，并绕关节旋转以贴合本参考体的体表。请把它们视为形状与位置的临时替代，而非本参考体自身的解剖。'},
 'donor-muscle':{name:'小腿肌肉（供体）',description:'髋部、大腿和小腿的肌肉，来自另一位女性：可见人体女性（Visible Human Female），由 Andreassen 等人分割。本参考体的数据源几乎未建模肌肉，这些肌肉填补了这一空缺。它们按本参考体自身的髋骨、股骨、髌骨、胫骨和腓骨适配，但属于另一个人，承载的是她的体格，而非这具身体的。'},
 'connective':{name:'结缔组织',description:'软骨、韧带和其他结缔组织支持、连接并分隔各结构。其作用包括稳定关节和分散机械负荷。'},
};

export const EDITIONS_ZH:Record<'male'|'female',{label:string;caption:string;dataset:string;summary:string;limits:string;credit:string}> = {
 male:{label:'男性',caption:'成年人体 · 男性',dataset:'BodyParts3D 4.0',
  summary:'2,234 个独立网格与 3,432 个命名概念，来自成年男性参考解剖。',
  limits:'覆盖全部已建模系统的全身参考，基于磁共振成像与解剖插图构建。其生殖结构默认隐藏，开启该系统即可显示。',
  credit:'BodyParts3D，© The Database Center for Life Science，依据 CC 署名 4.0 国际许可协议授权。'},
 female:{label:'女性',caption:'成年人体 · 女性',dataset:'人体参考图谱 · 女性 v1.10',
  summary:'964 个独立网格与 1,173 个命名概念，来自成年女性参考组合，另有 180 块借自男性参考的骨骼和 76 块来自第二位女性参考的小腿肌肉，用以填补其数据源未建模的区域。',
  limits:'包含体表、脑和部分器官（含女性生殖解剖）的参考组合。骨骼覆盖仅限于脊柱、胸骨、骨盆和膝部：其数据源未建模任何颅骨、肋骨、手臂骨或足骨，这些骨骼借自男性参考并单独列为“借自男性的骨骼”，默认关闭。其数据源也几乎未建模肌肉，髋部、大腿和小腿的肌肉来自第二位女性参考，列为“供体小腿肌肉”。没有任何肌肉借自男性参考：肌肉会明显带有其来源身体的形状，那样并不诚实。胎盘与脐带结构属于妊娠参考，同样默认隐藏，直到您开启它们。',
  credit:'女性 v1.10 三维参考器官集，作者 Kristen Browne 与 Heidi Schlehlein，HuBMAP 人体参考图谱，基于美国国家医学图书馆的可见人体数据集构建。其小腿肌肉来自 Andreassen 等人的可见人体女性下肢数据集。两者均依据 CC 署名 4.0 国际许可协议授权。'},
};
