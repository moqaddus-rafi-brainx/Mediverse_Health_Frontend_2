/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-select components

import CreatableSelect from "react-select/creatable";

// Argon Dashboard 2 PRO MUI base styles
import colors from "assets/theme/base/colors";

// Argon Dashboard 2 PRO MUI context
import { useArgonController } from "context";

// Custom styles for ArgonCreatableSelect
import styles from "./styles";

const ArgonCreatableSelect = forwardRef(
  ({ size, error, success, customize, disable, ...rest }, ref) => {
    const [controller] = useArgonController();
    const { darkMode } = controller;
    const { light } = colors;

    return (
      <CreatableSelect
        {...rest}
        ref={ref}
        isMulti={rest?.multiple}
        styles={styles(size, error, success, darkMode, customize)}
        menuShouldBlockScroll={false}
        isSearchable={true}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: light.main,
            primary: light.main,
          },
        })}
        isDisabled={disable}
      />
    );
  }
);

// Setting default values for the props of ArgonSelect
ArgonCreatableSelect.defaultProps = {
  size: "medium",
  error: false,
  success: false,
};

// Typechecking props for the ArgonCreatableSelect
ArgonCreatableSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
  customize: PropTypes.bool,
  disable: PropTypes.bool,
};

export default ArgonCreatableSelect;
