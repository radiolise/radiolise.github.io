import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowDown,
  faArrowRight,
  faBan,
  faBars,
  faCheck,
  faCheckSquare,
  faChevronDown,
  faCog,
  faCommentDots,
  faComments,
  faCompress,
  faDownload,
  faEdit,
  faEllipsisV,
  faExclamationCircle,
  faExclamationTriangle,
  faExpand,
  faExternalLinkAlt,
  faFileAudio,
  faFileImport,
  faFilter,
  faFlag,
  faHistory,
  faHome,
  faInfoCircle,
  faKeyboard,
  faListAlt,
  faMapMarker,
  faMusic,
  faPlay,
  faPlayCircle,
  faPlus,
  faQuestion,
  faQuestionCircle,
  faRedo,
  faSearch,
  faSort,
  faSpinner,
  faStepBackward,
  faStepForward,
  faStop,
  faThumbsUp,
  faTimes,
  faTimesCircle,
  faTrash,
  faUndo,
  faUpload,
  faVolumeOff,
  faVolumeUp,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { faMeh, faSquare } from "@fortawesome/free-regular-svg-icons";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faArrowDown,
  faArrowRight,
  faBan,
  faBars,
  faCheck,
  faCheckSquare,
  faChevronDown,
  faCog,
  faCommentDots,
  faComments,
  faCompress,
  faDownload,
  faEdit,
  faEllipsisV,
  faExclamationCircle,
  faExclamationTriangle,
  faExpand,
  faExternalLinkAlt,
  faFileAudio,
  faFileImport,
  faFilter,
  faFlag,
  faHistory,
  faHome,
  faInfoCircle,
  faKeyboard,
  faListAlt,
  faMapMarker,
  faMusic,
  faPlay,
  faPlayCircle,
  faPlus,
  faQuestion,
  faQuestionCircle,
  faRedo,
  faSearch,
  faSort,
  faSpinner,
  faStepBackward,
  faStepForward,
  faStop,
  faThumbsUp,
  faTimes,
  faTimesCircle,
  faTrash,
  faUndo,
  faUpload,
  faVolumeOff,
  faVolumeUp,
  faWrench,
  faMeh,
  faSquare,
  faGitlab
);

Vue.component("font-awesome-icon", FontAwesomeIcon);