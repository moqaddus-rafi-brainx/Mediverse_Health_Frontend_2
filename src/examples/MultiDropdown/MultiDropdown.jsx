import React, { Component } from "react";
import { components } from "react-select";
import Select from "react-select";
import Button from "@atlaskit/button";
import { defaultTheme } from "react-select";
import PropTypes from "prop-types";
import "./MultiDropdown.css";

const { colors } = defaultTheme;

const selectStyles = {
  control: (provided) => ({
    ...provided,
    margin: 8,
    borderColor: "#d2d6da",
    backgroundColor: "#F4F4F4",
  }),
  menu: () => ({ boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.1)" }),
};

class MultiDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      value: this.props.value?.length
        ? this.props.value.map((val) => this.props.options.find((option) => option.value === val))
        : [],
    };
  }

  toggleOpen = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }));
  };

  onSelectChange = (value) => {
    this.setState({ value });
    this.props.valueChange(value.map((val) => val.value));
  };

  selectedClose = (selected) => {
    this.toggleOpen(false);
    const newValue = this.state.value.filter((val) => val.value !== selected.value);
    this.setState({
      value: newValue,
    });
    this.props.valueChange(newValue.map((val) => val.value));
  };

  render() {
    const { isOpen, value } = this.state;
    return (
      <Dropdown
        isOpen={isOpen}
        onClose={this.toggleOpen}
        target={
          <Button
            className="w-100 align-items-center multiDropdown"
            iconAfter={<ChevronDown />}
            onClick={this.toggleOpen}
            isSelected={isOpen}
          >
            {value.length && !this.props?.jobDetailViewGraph ? (
              <div className="w-100 parent-selectedLabels">
                {value.map((val) => (
                  <div key={val?.value} className="selectedLabel">
                    <span className="me-2">{val?.label}</span>
                    <img
                      alt="close"
                      src="/close.svg"
                      className="selectedClose"
                      onClick={() => this.selectedClose(val)}
                    />
                  </div>
                ))}
              </div>
            ) : this.props.placeholder ? (
              <div className="w-100 dropdown-placeholder">{this.props.placeholder}</div>
            ) : (
              " "
            )}
          </Button>
        }
      >
        <span className="d-inline-block w-100" data-toggle="popover" data-trigger="focus">
          <Select
            autoFocus
            backspaceRemovesValue={false}
            components={{ DropdownIndicator, IndicatorSeparator: null, Option }}
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            isClearable={false}
            menuIsOpen
            isMulti
            closeMenuOnSelect={false}
            onChange={this.onSelectChange}
            options={this.props.options}
            styles={selectStyles}
            tabSelectsValue={false}
            value={value}
            allowSelectAll={true}
          />
        </span>
      </Dropdown>
    );
  }
}

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          className="me-3"
          role="button"
        />
        <label role="button">{props.label}</label>
      </components.Option>
    </div>
  );
};

Option.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

const Menu = (props) => {
  return <div className="menuDropdown" {...props} />;
};

const Blanket = (props) => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: "fixed",
    }}
    {...props}
  />
);

const Dropdown = ({ children, isOpen, target, onClose }) => (
  <div style={{ position: "relative" }}>
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </div>
);

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  target: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Svg = (p) => (
  <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation" {...p} />
);

const DropdownIndicator = () => (
  <div style={{ color: colors.neutral20, height: 24, width: 32 }}>
    <Svg>
      <path
        d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  </div>
);

const ChevronDown = () => (
  <Svg style={{ marginRight: -6 }}>
    <path
      d="M8.292 10.293a1.009 1.009 0 0 0 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955a1.01 1.01 0 0 0 0-1.419.987.987 0 0 0-1.406 0l-2.298 2.317-2.307-2.327a.99.99 0 0 0-1.406 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Svg>
);

MultiDropdown.propTypes = {
  value: PropTypes.array.isRequired,
  valueChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  jobDetailViewGraph: PropTypes.bool,
};

export default MultiDropdown;
