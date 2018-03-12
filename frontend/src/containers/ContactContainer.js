import { connect } from "react-redux";

import { submitContactForm } from "../actions/contactFormActions";
import Contact from "../components/Contact";

const mapStateToProps = state => ({ contact_form: state.contact_form });
const mapDispatchToProps = dispatch => {
  return {
    submitContactForm: data => dispatch(submitContactForm(data)),
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
