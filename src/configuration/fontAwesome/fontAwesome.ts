import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const fontAwesome = () => {
  library.add(faEnvelope, faFacebook, faInstagram, faTwitter);
};

export default fontAwesome;
