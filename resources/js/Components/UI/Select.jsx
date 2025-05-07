import React, { useEffect, useRef, useState } from "react";

const Select = ({
    name,
    id,
    className = "",
    autoComplete,
    required,
    isFocused,
    handleChange,
    message = "",
    children,
    placeholder = "",
    value = "",
    disabled = false,
    placeholderShow = true,
}) => {
    const select = useRef();

    useEffect(() => {
        if (isFocused) {
            select.current.focus();
        }
    }, []);

    return (
        <>
            <select
                value={value == null ? "" : value}
                className={`form-select ${className} ${message && "invalid"}`}
                id={id}
                name={name}
                required={required}
                autoComplete={autoComplete}
                ref={select}
                onChange={(e) => {
                    handleChange(e);
                }}
                disabled={disabled}
            >
                {placeholder !== "" ? (
                    <option value="">{placeholder}</option>
                ) : null}

                {children}
            </select>
            {message && <div className="invalid-tooltip">{message}</div>}
        </>
    );
};

export default Select;
