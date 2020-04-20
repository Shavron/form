import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

export default function ReactHookForm() {
  const { register, handleSubmit, errors, reset, watch } = useForm({
    mode: "onBlur"
  });
  const onSubmit = (data, e) => {
    console.log(data);
    //e.target.reset();
  };
  const moreDetail = watch("moreDetail");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First name</label>

      <input
        name="firstName"
        ref={register({ required: true, maxLength: 20 })}
        defaultValue="Abhilash"
      />
      <span className="error">
        {errors.firstName && "First name is required"}
      </span>
      <label>Last name</label>
      <input
        name="lastName"
        ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
        placeholder="Shukla"
      />
      <span className="error">
        {errors.lastName && "Last name is required"}
      </span>
      <label>Age</label>
      <input
        name="age"
        type="number"
        ref={register({ required: true, min: 18, max: 99 })}
      />
      <span className="error">{errors.age && "18-99"}</span>

      <label htmlFor="lastName">Subscribe</label>
      <input name="moreDetail" type="checkbox" ref={register} />
      {moreDetail && (
        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email
          </label>
          <input
            type="email"
            name="email"
            ref={register({
              required: true,
              pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            })}
          />
          {errors.email && (
            <span className="error">Please input a valid email</span>
          )}
        </div>
      )}

      <input type="submit" />
    </form>
  );
}
