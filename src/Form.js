import React from "react";
import "./Form.css";

const inputParsers = {
  date(input) {
    const split = input.split("/");
    const day = split[1];
    const month = split[0];
    const year = split[2];
    return `${year}-${month}-${day}`;
  },
  uppercase(input) {
    return input.toUpperCase();
  },
  number(input) {
    return parseFloat(input);
  }
};

class ShakingError extends React.Component {
  constructor() {
    super();
    this.state = { key: 0 };
  }

  componentWillReceiveProps() {
    // update key to remount the component to rerun the animation
    this.setState({ key: ++this.state.key });
  }

  render() {
    return (
      <div key={this.state.key} className="bounce">
        {this.props.text}
      </div>
    );
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.state = { selectedFile: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeHandler = event => {
    // this.setState({
    //   ...this.state,
    //   selectedFile: event.target.files[0],
    //   loaded: 0
    // });
  };
  handleSubmit(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      this.setState({
        invalid: true,
        displayErrors: true
      });
      return;
    }
    const form = event.target;
    const data = new FormData(form);
    //data.append("file", this.state.selectedFile);
    // console.log(data.get("username"));
    // console.log(data.getAll("name[]"));

    for (let name of data.keys()) {
      const input = form.elements[name];
      const parserName = input.dataset ? input.dataset.parse : "";
      // console.log("parser name is", parserName);
      if (parserName) {
        const parsedValue = inputParsers[parserName](data.get(name));
        data.set(name, parsedValue);
      }
    }

    this.setState({
      res: stringifyFormData(data),
      invalid: false,
      displayErrors: false
    });

    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: data
    })
      .then(response => {
        if (response.ok) {
          console.log("File upload done..");
          // console.log(response.json());
          return false;
        }
      })
      .then(res => {
        console.log("File upload done data..");
        console.log(res);

        return false;
      })
      .catch(e => {
        console.log("File upload done Error..");
        console.log(e);
        return false;
      });

    // console.log(this.state);
  }

  render() {
    const { res, invalid, displayErrors } = this.state;
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          noValidate
          className={displayErrors ? "displayErrors" : ""}
        >
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            data-parse="uppercase"
            pattern="[A-Za-z]{4,}"
            required
          />
          <label htmlFor="username">Firstname:</label>

          <input
            id="firstname"
            name="name"
            type="text"
            data-parse="uppercase"
            pattern="[A-Za-z]{4,}"
            required
          />
          <label htmlFor="username">lastname:</label>

          <input
            id="lastname"
            name="name"
            type="text"
            data-parse="uppercase"
            pattern="[A-Za-z]{4,}"
            required
          />

          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="mobile">Mobile:</label>
          <input type="text" name="mobile" pattern="[7-9]{1}[0-9]{9}" />
          <label htmlFor="birthdate">Birthdate:</label>
          <input
            id="birthdate"
            name="birthdate"
            type="text"
            data-parse="date"
            placeholder="MM/DD//YYYY"
            pattern="\d{2}\/\d{2}/\d{4}"
            required
          />
          <label htmlFor="gender">Gender:</label>
          <label className="container">
            Male
            <input type="radio" name="radio" defaultValue="male" />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            Female
            <input type="radio" name="radio" defaultValue="famale" />
            <span className="checkmark"></span>
          </label>
          <label htmlFor="Occupation">Occupation:</label>
          <select name="Occupation">
            <option> --Select Your Occupation-- </option>
            <option> Private </option>
            <option> Governmant </option>
            <option> Semi Private </option>
            <option> Technical </option>
            <option> Computer Science </option>
          </select>
          <div>
            <label className="switch">
              <input type="checkbox" name="tnc" defaultValue="1" />
              <span className="slider"></span>
            </label>
            <label htmlFor="Occupation"> Please accept T&C.</label>
          </div>

          <br />
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          {/* <input type="file" name="file" onChange={this.onChangeHandler} /> */}
          <input type="file" name="file" />

          <button>Send data!</button>
        </form>

        <div className="res-block">
          {invalid && <ShakingError text="Form is not valid" />}
          {!invalid && res && (
            <div>
              <h3>Transformed data to be sent:</h3>
              <pre>FormData {res}</pre>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    console.log(fd.getAll(key));
    data[key] = fd.getAll(key).length > 1 ? fd.getAll(key) : fd.get(key);
  }
  console.log(data);
  return JSON.stringify(data, null, 2);
}

export default Form;
