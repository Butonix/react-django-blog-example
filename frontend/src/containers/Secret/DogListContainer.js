import { requestDogs } from "../../actions/testing_auth.js";
import DogList from "../../components/Secret/DogList";

import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    dogs: state.dogs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestDogs: () => dispatch(requestDogs())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DogList);
