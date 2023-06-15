import { Link } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

function Navbar() {
  return (
    <div>
      <Link to="/">
        <MDBBtn rounded className="navbtn">
          Home
        </MDBBtn>
      </Link>
      <Link to="/formpage">
        <MDBBtn rounded className="navbtn">
          Form
        </MDBBtn>
      </Link>
    </div>
  );
}

export default Navbar;
