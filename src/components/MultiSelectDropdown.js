import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { theme } from "../styles/Theme";

export const MultiSelectDropdown = ({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Select items",
  searchPlaceholder = "Search...",
  noOptionsText = "No items found",
  width = "280px",
  singleSelect = false,
  loading = false,
  loadingText = "Loading..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format options to always be an array of objects { label, value }
  const formattedOptions = options.map(opt => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: String(opt), value: opt };
    }
    return opt;
  });

  // Toggle selection
  const handleToggle = (optionValue) => {
    let newSelected;
    if (singleSelect) {
      newSelected = selectedValues.includes(optionValue) ? [] : [optionValue];
      setIsOpen(false);
    } else {
      if (selectedValues.includes(optionValue)) {
        newSelected = selectedValues.filter((v) => v !== optionValue);
      } else {
        newSelected = [...selectedValues, optionValue];
      }
    }
    onChange && onChange(newSelected);
  };

  // Filter options by search
  const filteredOptions = formattedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Disable dropdown interaction while loading
  const isDisabled = loading;

  return (
    <div style={{ position: "relative", width: width }} ref={dropdownRef}>
      {/* Field (like <select>) */}
      <div
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "0.5rem",
          cursor: isDisabled ? "not-allowed" : "pointer",
          background: isDisabled ? "#f5f5f5" : "white",
          color: theme.colors.text,
          opacity: isDisabled ? 0.7 : 1,
        }}
      >
        <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {loading ? (
            loadingText
          ) : singleSelect && selectedValues.length > 0 ? (
            formattedOptions.find(o => o.value === selectedValues[0])?.label || placeholder
          ) : !singleSelect && selectedValues.length > 0 ? (
            `${selectedValues.length} item(s) selected`
          ) : (
            placeholder
          )}

          {!loading && (isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />)}
        </span>
      </div>

      {/* Dropdown */}
      {!loading && isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "0.3rem",
            zIndex: 1000,
          }}
        >
          {/* Search box */}
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "none",
              borderBottom: "1px solid #eee",
              outline: "none",
            }}
          />

          {/* Options list with loading state */}
          <div style={{ maxHeight: "250px", overflowY: "auto", padding: "0.5rem" }}>
            {loading ? (
              <div style={{ color: "#777", textAlign: "center", padding: "1rem" }}>
                {loadingText}
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((opt, index) => (
                <label key={index} style={{ display: "block", marginBottom: "0.3rem", color: theme.colors.text, cursor: "pointer" }}>
                  <input
                    type={singleSelect ? "radio" : "checkbox"}
                    checked={selectedValues.includes(opt.value)}
                    onChange={() => handleToggle(opt.value)}
                    style={{ marginRight: "0.5rem" }}
                  />{" "}
                  {opt.label}
                </label>
              ))
            ) : (
              <div style={{ color: "#777" }}>{noOptionsText}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};