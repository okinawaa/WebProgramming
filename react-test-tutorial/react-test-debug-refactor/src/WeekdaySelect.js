import React from "react";
import styles from "./WeekdaySelect.module.css";

function WeekdaySelect({ weekdays, selectedWeekday, setSelectedWeekday }) {
  return (
    <label>
      Selected weekday:
      <select
        className={styles.select}
        value={selectedWeekday === null ? "" : selectedWeekday}
        onChange={(e) => setSelectedWeekday(e.target.value)}
      >
        <option value="" disabled>
          Select your option
        </option>
        {weekdays.map((weekday) => (
          <option key={weekday} value={weekday}>
            {weekday}
          </option>
        ))}
      </select>
    </label>
  );
}

export default WeekdaySelect;
