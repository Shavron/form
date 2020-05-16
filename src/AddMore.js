import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddMore() {
  const [options, setoptions] = useState([]);
  const { register, handleSubmit, errors, reset, watch } = useForm({
    mode: "onBlur"
  });
  var oRef = [];
  const onSubmit = (data, e) => {
    console.log(data);
    //e.target.reset();
  };
  const moreDetail = watch("moreDetail");

  const addMore = () => {
    setoptions([...options, ""]);
  };
  const remove = index => {
    //[...options].splice([...options].indexOf(index, 1));

    // let arr = [...options].filter(function(item) {
    //     return item !== value
    // })

    console.log(index);
    console.log(options);
    console.log(options.splice(index, 1));
    //setoptions();
    //e.target.remove();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Fill More Names</label>
      {options.map((op, index) => {
        // oRef[`options${index}`] = React.createRef();
        return (
          <div>
            <input
              name={`options${index}`}
              placeholder="type here..."
              type="text"
              // ref={oRef[`options${index}`]}
              ref={register}
              style={{ width: "70%", float: "left" }}
            />
            <button onClick={e => remove(index)}> X </button>
          </div>
        );
      })}
      <br />
      <button onClick={addMore}>Add More</button>
      <input type="submit" />
    </form>
  );
}
