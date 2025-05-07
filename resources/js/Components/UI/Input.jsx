import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./Input.css";

export default function Input({
    type = "text",
    name,
    value = "",
    id,
    className = "",
    autoComplete = "off",
    required,
    placeholder,
    isFocused,
    handleChange,
    message = "",
    checked,
    accept,
    min = "",
    max = "",
    maxLength = 100,
    disabled = false,
    multiple = false,
    messageShow = true,
    validationEmail,
    validationPassword,
    emailPassword,
    setInputFields,
    step = ''
}) {


    const input = useRef();
    const [inputState, setInputState] = useState(true);
    const [validation, setValidation] = useState(true);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    useEffect(() => {
        inputState?.target?.value ? setValidation(false) : setValidation(true);
    }, [inputState])



    let inputHtml;
    if (type === "checkbox") {
        inputHtml = (
            <input
                type={type}
                name={name}
                disabled={disabled}
                value={value == null ? "" : value}
                className={`${className}`}
                ref={input}
                id={id}
                autoComplete={autoComplete}
                required={required}
                placeholder={placeholder}
                onChange={(e) => {
                    handleChange(e);
                    setInputState(e);
                }}
                checked={checked}
            />
        );
    } else if (handleChange === undefined) {
        inputHtml = (
            <input
                type={type}
                disabled={disabled}
                name={name}
                className={`form-control ${className} ${message && "invalid"}`}
                ref={input}
                id={id}
                maxLength={maxLength}
                autoComplete={autoComplete}
                required={required}
                placeholder={placeholder}
            />
            // ${ message && "invalid" }
        );
    } else if (accept !== undefined) {
        inputHtml = (
            <input
                type={type}
                disabled={disabled}
                name={name}
                value={value == null ? "" : value}
                className={`form-control ${className} ${message && "invalid"}`}
                ref={input}
                id={id}
                autoComplete={autoComplete}
                maxLength={maxLength}
                required={required}
                placeholder={placeholder}
                multiple={multiple}
                onChange={(e) => {
                    handleChange(e);
                    setInputState(e);
                }}
                accept={type === "file" && accept}
            />
        );
    } else {
        if (emailPassword) {
            inputHtml = (
                <input
                    type={type}
                    name={name}
                    value={value == null ? "" : value}
                    className={`form-control ${className} ${message && "invalid"}`}
                    ref={input}
                    id={id}
                    autoComplete={autoComplete}
                    required={required}
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleChange(e);
                        setInputFields(e);

                    }}
                    disabled={disabled}
                    multiple={multiple}
                    min={min}
                    max={max}
                    step={step}
                    maxLength={maxLength}
                />
            );
        }
        else {
            inputHtml = (
                <input
                    type={type}
                    name={name}
                    value={value == null ? "" : value}
                    className={`form-control ${className} ${message && "invalid"}`} // by munawar Samdani
                    ref={input}
                    id={id}
                    autoComplete={autoComplete}
                    required={required}
                    placeholder={placeholder}
                    onChange={(e) => {
                        handleChange(e);
                        setInputState(e);
                    }}
                    disabled={disabled}
                    multiple={multiple}
                    min={min}
                    max={max}
                    step={step}
                    maxLength={maxLength}
                />
            );
        }
    }

    return (
        <>
            {inputHtml}
            {/* {validation ? (messageShow && message &&
                <div className="invalid-tooltip">{message}</div>
            ) : null} */}
            {message && (
                <div className="invalid-tooltip">{message}</div>
            )}
        </>
    );
}
