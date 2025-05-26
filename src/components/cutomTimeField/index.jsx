/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TimeField from "./TimeInput";
import { UPDATE_ENTRY } from "../../constants";
import moment from "moment";
import { toast } from "react-toastify";

export default function TimeFieldWrapper({
  timeEntry,
  handleBlur,
  startTime,
  endTime,
  entryType,
  disabled,
  handleChange,
}) {
  const [time, setTime] = useState(timeEntry);

  useEffect(() => {
    setTime(timeEntry);
  }, [timeEntry]);

  const handleOnBlur = (e) => {
    let newTime, diff;
    if (entryType === UPDATE_ENTRY.colckIn) {
      if (e.target.value !== moment(startTime).format("HH:mm")) {
        newTime = moment(startTime)
          .set("hour", e.target.value?.split(":")[0])
          .set("minute", e.target.value?.split(":")[1])
          .toISOString();

        diff = moment(endTime).isBefore(moment(newTime), "seconds");
        if (diff) {
          setTime(moment(startTime).format("HH:mm"));
          toast.error(`CheckIn time can't be after Checkout time.`);
        } else {
          handleBlur(e);
        }
      }
    } else if (entryType === UPDATE_ENTRY.clockout) {
      if (e.target.value !== moment(endTime).format("HH:mm")) {
        newTime = moment(endTime)
          .set("hour", e.target.value?.split(":")[0])
          .set("minute", e.target.value?.split(":")[1])
          .toISOString();
        diff = moment(startTime).isAfter(moment(newTime), "seconds");
        if (diff) {
          setTime(moment(endTime).format("HH:mm"));
          toast.error(`CheckIn time can't be after Checkout time.`);
        } else {
          handleBlur(e);
        }
      }
    }
  };

  return (
    <TimeField
      className="tt-desc-input time-input normal-text-primary"
      value={time}
      onChange={(e) => handleChange(e)}
      onBlur={handleOnBlur}
      disabled={disabled}
    />
  );
}
