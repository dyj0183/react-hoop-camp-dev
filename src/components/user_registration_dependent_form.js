import React, { useState, Fragment } from "react";
import "./user_registration_dependent_form.css";
import ClipLoader from "react-spinners/ClipLoader";

const UserRegistrationDependentForm = ({ onGetDependentFormValues }) => {
	// handle first name
	const [enteredFirstName, setEnteredFirstName] = useState("");
	const firstNameChangeHandler = (event) => {
		setEnteredFirstName(event.target.value);
	};

	// handle email
	const [enteredEmail, setEnteredEmail] = useState("");
	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	// handle city
	const [enteredCity, setEnteredCity] = useState("");
	const cityChangeHandler = (event) => {
		setEnteredCity(event.target.value);
	};

	// handle last name
	const [enteredLastName, setEnteredLastName] = useState("");
	const lastNameChangeHandler = (event) => {
		setEnteredLastName(event.target.value);
	};

	// handle phone
	const [enteredPhone, setEnteredPhone] = useState("");
	const phoneChangeHandler = (event) => {
		setEnteredPhone(event.target.value);
	};

	// handle state
	const [enteredState, setEnteredState] = useState("");
	const stateChangeHandler = (event) => {
		setEnteredState(event.target.value);
	};

	// handle country
	const [enteredCountry, setEnteredCountry] = useState("");
	const countryChangeHandler = (event) => {
		setEnteredCountry(event.target.value);
	};

	// handle password
	const [enteredPassword, setEnteredPassword] = useState("");
	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);
	};

	// handle confirm password
	const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
	const confirmPasswordChangeHandler = (event) => {
		setEnteredConfirmPassword(event.target.value);
	};

	// For form error validation, set it to true because we don't want to show any erros at beginning
	const [formIsValid, setFormIsValid] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	// For loading spinner
	const [creatingUser, setCreatingUser] = useState(false);

	// handle the change of dependent first name
	const depFirstNameChangeHandler = (event, id) => {
		const newList = [...dependentList];
		newList.forEach((dependent) => {
			// Only update the first name if the id matches, so we make sure to update the right dependent
			if (dependent.id === id) {
				dependent.firstname = event.target.value;
			}
		});

		setDependentList(newList);
	};

	// handle the change of dependent last name
	const depLastNameChangeHandler = (event, id) => {
		const newList = [...dependentList];
		newList.forEach((dependent) => {
			// Only update the last name if the id matches, so we make sure to update the right dependent
			if (dependent.id === id) {
				dependent.lastname = event.target.value;
			}
		});

		setDependentList(newList);
	};

	// Set up the dependent id, starting with 1
	const [dependentID, setDependentID] = useState(1);

	// This will be used for all the dependent(s) fields
	const [dependentList, setDependentList] = useState([
		{ firstname: "", lastname: "", id: dependentID },
	]);

	// Add new dependent
	const addNewDependentHandler = () => {
		setDependentList([
			...dependentList,
			{ firstname: "", lastname: "", id: dependentID + 1 },
		]);
		setDependentID(dependentID + 1);
	};

	console.log(dependentList);

	// Remove the dependent field (both first name and last name)
	const removeDependentHandler = (dependentID) => {
		const newList = [];
		// Remove the clicked one based on its id in the array list
		dependentList.forEach((dependent) => {
			if (dependent.id !== dependentID) {
				newList.push(dependent);
			}
		});

		setDependentList(newList);
	};

	// Handle user input when they click on "Register"
	const submitHandler = (event) => {
		// Clean out old error messages first
		setFormIsValid(true);
		setErrorMessage("");

		// Make the spinner show up
		setCreatingUser(true);

		// Prevent the form from being sending to the server, so the page will NOT be reloaded
		event.preventDefault();

		// If any myself form field is empty, set the formIsValid to false and display the error message
		if (
			enteredFirstName === "" ||
			enteredEmail === "" ||
			enteredCity === "" ||
			enteredLastName === "" ||
			enteredPhone === "" ||
			enteredState === "" ||
			enteredCountry === "" ||
			enteredPassword === "" ||
			enteredConfirmPassword === ""
		) {
			setFormIsValid(false);
			setErrorMessage("No empty field is allowed.");
			setCreatingUser(false);
			return;
		}

		// Make sure all dependent fields are not empty
		let emptyDependent = 0;
		dependentList.forEach((dependent) => {
			if (dependent.firstname === "" || dependent.lastname === "") {
				emptyDependent++;
			}
		});
		if (emptyDependent > 0) {
			setFormIsValid(false);
			setErrorMessage("No empty field is allowed.");
			setCreatingUser(false);
			return;
		}

		if (enteredConfirmPassword !== enteredPassword) {
			setFormIsValid(false);
			setErrorMessage("Confirm Password doesn't match the Password.");
			setCreatingUser(false);
			return;
		}

		// For all the key names in the object, we must match what we have in the C# controller
		const myselfData = {
			firstname: enteredFirstName,
			emailaddress1: enteredEmail,
			address1_city: enteredCity,
			lastname: enteredLastName,
			address1_telephone1: enteredPhone,
			address1_stateorprovince: enteredState,
			address1_country: enteredCountry,
		};

		// Pass data up to the parent component, both myselft and all the dependent(s) data, we also need first name and password to create a new credential
		onGetDependentFormValues(
			myselfData,
			dependentList,
			enteredEmail,
			enteredPassword,
			setCreatingUser
		);
	};

	return (
		<div className="react-userRegisterForm-dependent">
			{creatingUser && (
				<div>
					<h1>Creating a user and dependent(s)...</h1>
					<ClipLoader color="rgb(255,177,3)" size={100} />
				</div>
			)}
			{!creatingUser && (
				<form onSubmit={submitHandler}>
					<h3>Myself</h3>
					<div className="react-userRegisterForm-dependent-myself-grid-container">
						<div className="react-userRegisterForm-dependent-myself-grid-format">
							<label htmlFor="fname">First Name</label>
							<br />
							<input
								type="text"
								name="first_name"
								id="fname"
								onChange={firstNameChangeHandler}
								required
							/>
						</div>
						<div className="react-userRegisterForm-dependent-myself-grid-format">
							<label htmlFor="lname">Last Name</label>
							<br />
							<input
								type="text"
								name="last_name"
								id="lname"
								onChange={lastNameChangeHandler}
								required
							/>
						</div>
						<div className="react-userRegisterForm-dependent-myself-grid-format">
							<label htmlFor="email">Email</label>
							<br />
							<input
								type="email"
								name="email"
								id="email"
								onChange={emailChangeHandler}
								required
							/>
						</div>
						<div className="react-userRegisterForm-dependent-myself-grid-format">
							<label htmlFor="city">City</label>
							<br />
							<input
								type="text"
								name="city"
								id="city"
								onChange={cityChangeHandler}
								required
							/>
						</div>
						<div className="react-userRegisterForm-dependent-myself-grid-format">
							<label htmlFor="state">State</label>
							<br />
							<input
								type="text"
								name="state"
								id="state"
								onChange={stateChangeHandler}
								required
							/>
						</div>
						<div className="react-userRegisterForm-dependent-myself-grid-format">
							<label htmlFor="country">Country</label>
							<br />
							<input
								type="text"
								name="country"
								id="country"
								onChange={countryChangeHandler}
								required
							/>
						</div>
						<div className="react-userRegisterForm-dependent-myself-grid-format">
							<label htmlFor="phone">Phone</label>
							<br />
							<input
								type="text"
								name="phone"
								id="phone"
								onChange={phoneChangeHandler}
								required
							/>
						</div>
						<div className="react-userRegisterForm-myself-grid-format">
							<label htmlFor="password">Password</label>
							<br />
							<input
								type="password"
								minLength="4"
								name="password"
								id="password"
								placeholder="At least 4 characters long"
								onChange={passwordChangeHandler}
								required
							/>
						</div>
						<div className="react-userRegisterForm-myself-grid-format">
							<label htmlFor="confirm_password">Confirm Password</label>
							<br />
							<input
								type="password"
								minLength="4"
								name="confirm_password"
								id="confirm_password"
								placeholder="Must match the password"
								onChange={confirmPasswordChangeHandler}
								required
							/>
						</div>
					</div>
					<h3>Dependent(s)</h3>
					<div className="react-userRegisterForm-dependent-grid-container">
						{dependentList.map((dependent) => {
							return (
								<Fragment key={dependent.id}>
									<div className="react-userRegisterForm-dependent-grid-format">
										<label htmlFor="dependent_fname">
											Dependent First Name
										</label>
										<br />
										<input
											id="dependent_fname"
											type="text"
											name="dependent_first_name"
											onChange={(event) =>
												depFirstNameChangeHandler(event, dependent.id)
											}
											required
										/>
									</div>
									<div className="react-userRegisterForm-dependent-grid-format">
										<label htmlFor="dependent_lname">Dependent Last Name</label>
										<br />
										<input
											id="dependent_lname"
											type="text"
											name="dependent_last_name"
											onChange={(event) =>
												depLastNameChangeHandler(event, dependent.id)
											}
											required
										/>
									</div>
									{dependentList.length > 1 && (
										<div className="react-userRegisterForm-dependent-remove-button">
											<button
												type="button"
												onClick={() => removeDependentHandler(dependent.id)}
											>
												Remove
											</button>
										</div>
									)}
								</Fragment>
							);
						})}
					</div>
					<div className="react-userRegisterForm-dependent-grid-format">
						<button
							type="button"
							className="react-userRegisterForm-dependent-add-button"
							onClick={addNewDependentHandler}
						>
							Add More Dependent
						</button>
					</div>
					{!formIsValid && (
						<div className="react-userRegisterForm-myself-error-message">
							<h3>{errorMessage}</h3>
						</div>
					)}
					<button
						className="react-userRegisterForm-dependent-register-button"
						type="submit"
					>
						Register for All
					</button>
				</form>
			)}
		</div>
	);
};

export default UserRegistrationDependentForm;
