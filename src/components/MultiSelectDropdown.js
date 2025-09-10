import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const MultiSelectDropdown = ({ customers = [], selectedCustomers, setSelectedCustomers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchCustomer, setSearchCustomer] = useState("");
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

  // Toggle selection
  const handleCustomerToggle = (customer) => {
    setSelectedCustomers((prev) =>
      prev.includes(customer)
        ? prev.filter((c) => c !== customer) // remove
        : [...prev, customer] // add
    );
  };

  // Filter customers by search
  const filteredCustomers = customers.filter((customer) =>
    customer.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  return (
    <div style={{ position: "relative", width: "280px" }} ref={dropdownRef}>
      {/* Field (like <select>) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "0.5rem",
          cursor: "pointer",
          background: "white",
        }}
      >
		<span style={{display: "flex",justifyContent: "space-between", alignItems: "center"}}>
			{selectedCustomers.length > 0
			? `${selectedCustomers.length} customer(s) selected`
			: "Select customers"}

			{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown/>}
		</span>
      </div>

      {/* Dropdown */}
      {isOpen && (
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
            placeholder="Search customers..."
            value={searchCustomer}
            onChange={(e) => setSearchCustomer(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "none",
              borderBottom: "1px solid #eee",
              outline: "none",
            }}
          />

          {/* Checkbox list */}
          <div style={{ maxHeight: "250px", overflowY: "auto", padding: "0.5rem" }}>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <label key={index} style={{ display: "block", marginBottom: "0.3rem" }}>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer)}
                    onChange={() => handleCustomerToggle(customer)}
                  />{" "}
                  {customer}
                </label>
              ))
            ) : (
              <div style={{ color: "#777" }}>No customers found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};