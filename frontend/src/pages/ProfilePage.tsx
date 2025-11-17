import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IFormData {
  fullName: string;
  email: string;
  phone: string;
}

const UploadIcon: React.FC = () => (
  <svg
    className="w-12 h-12 text-gray-400 mb-3"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
    />
  </svg>
);

function ProfileForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [phoneRaw, setPhoneRaw] = useState<string>(""); // digits only
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "email") {
      setFormData((prev) => ({ ...prev, email: value }));
      if (emailError) setEmailError(false);
      return;
    }
    if (id === "fullName") {
      setFormData((prev) => ({ ...prev, fullName: value }));
      if (nameError) setNameError(false);
      return;
    }
  };

  const emailIsValid = (email: string) => {
    // simple industry-common validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  };

  const handleEmailBlur = () => {
    if (formData.email.trim() === "") {
      setEmailError(false);
      return;
    }
    setEmailError(!emailIsValid(formData.email));
  };

  const handleNameBlur = () => {
    if (formData.fullName.trim() === "") setNameError(true);
    else setNameError(false);
  };

  const formatPhoneDisplay = (digits: string) => {
    // format for nice display while typing (supports US / NANP styling)
    const d = digits.replace(/\D/g, "");
    if (d.length === 0) return "";
    // if starts with 1 and long enough, show +1 ...
    if (d.length > 10 && d[0] === "1") {
      const core = d.slice(1);
      if (core.length <= 3) return `+1 (${core}`;
      if (core.length <= 6) return `+1 (${core.slice(0, 3)}) ${core.slice(3)}`;
      return `+1 (${core.slice(0, 3)}) ${core.slice(3, 6)}-${core.slice(
        6,
        10
      )}`;
    }
    if (d.length <= 3) return d;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setPhoneRaw(raw);
    setFormData((prev) => ({ ...prev, phone: formatPhoneDisplay(raw) }));
    if (phoneError) setPhoneError(false);
  };

  const handlePhoneBlur = () => {
    // consider valid if at least 10 digits (NANP)
    const digits = phoneRaw.replace(/\D/g, "");
    if (digits.length < 10) setPhoneError(true);
    else setPhoneError(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      const name = f.name.toLowerCase();
      const mime = f.type;
      const okMime =
        mime === "application/pdf" ||
        mime === "application/msword" ||
        mime ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const okExt =
        name.endsWith(".pdf") ||
        name.endsWith(".doc") ||
        name.endsWith(".docx");

      if (!okMime && !okExt) {
        setFileError("Unsupported file type. Please upload PDF/DOC/DOCX.");
        setFile(null);
        return;
      }
      setFile(f);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate
    let ok = true;
    if (formData.fullName.trim() === "") {
      setNameError(true);
      ok = false;
    }
    if (!emailIsValid(formData.email)) {
      setEmailError(true);
      ok = false;
    }
    if (phoneRaw.replace(/\D/g, "").length < 10) {
      setPhoneError(true);
      ok = false;
    }
    if (file === null) {
      setFileError("Please upload a resume (PDF/DOC/DOCX).");
      ok = false;
    }
    if (!ok) return;

    const completeFormData = { ...formData, resume: file };
    console.log("Form Data Submitted:", completeFormData);
    // navigate to library after successful submit
    navigate("/library");
  };

  const handleDragEvent = useCallback(
    (e: React.DragEvent<HTMLDivElement>, action: "over" | "leave" | "drop") => {
      e.preventDefault();
      e.stopPropagation();

      switch (action) {
        case "over":
          setIsDragging(true);
          break;
        case "leave":
          setIsDragging(false);
          break;
        case "drop":
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const f = e.dataTransfer.files[0];
            // reuse validation logic
            const name = f.name.toLowerCase();
            const mime = f.type;
            const okMime =
              mime === "application/pdf" ||
              mime === "application/msword" ||
              mime ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            const okExt =
              name.endsWith(".pdf") ||
              name.endsWith(".doc") ||
              name.endsWith(".docx");

            if (!okMime && !okExt) {
              setFileError(
                "Unsupported file type. Please upload PDF/DOC/DOCX."
              );
              setFile(null);
              return;
            }
            setFileError(null);
            setFile(f);
          }
          break;
      }
    },
    []
  );

  const dropZoneClass = `
    relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors
    ${
      isDragging
        ? "border-blue-500 bg-blue-50"
        : fileError
        ? "border-red-400 bg-white"
        : "border-gray-300 bg-gray-50 hover:border-gray-400"
    }
  `;

  useEffect(() => {
    const id = "sora-poppins-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Sora:wght@700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md flex flex-col h-[75vh]">
        {/* header stuck to top of card */}
        <div className="w-full flex-none">
          <h1
            className="text-center mb-2"
            style={{
              fontFamily:
                "Sora, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
              fontWeight: 700,
              fontSize: "1.875rem",
              color: "#111827",
            }}
          >
            Your Profile
          </h1>
          <p
            className="text-center"
            style={{
              fontFamily:
                "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
              fontWeight: 400,
              color: "#64748B",
            }}
          >
            Enter your personal information and resume.
          </p>
        </div>

        {/* scrollable form content */}
        <form
          id="profileForm"
          onSubmit={handleSubmit}
          className="flex-1 overflow-auto mt-4 pb-6"
        >
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="block text-sm mb-2"
              style={{
                fontFamily:
                  "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                fontWeight: 500,
                color: "#475569",
              }}
            >
              Full Name
            </label>

            <div className="relative">
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                onBlur={handleNameBlur}
                placeholder="Alex Doe"
                className="w-full px-4 py-3 outline-none"
                style={{
                  border: `1px solid ${nameError ? "#EF4444" : "#CBD5E1"}`,
                  borderRadius: 8,
                  fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                  fontWeight: 400,
                  color: "#1E293B",
                  backgroundColor: "white",
                }}
                aria-invalid={nameError}
              />
              {nameError && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 7v6"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 16h.01"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm mb-2"
              style={{
                fontFamily:
                  "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                fontWeight: 500,
                color: "#475569",
              }}
            >
              Email Address
            </label>

            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleEmailBlur}
                placeholder="alex.doe@example.com"
                className="w-full px-4 py-3 outline-none"
                style={{
                  border: `1px solid ${emailError ? "#EF4444" : "#CBD5E1"}`,
                  borderRadius: 8,
                  fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                  fontWeight: 400,
                  color: "#1E293B",
                  backgroundColor: "white",
                }}
                aria-invalid={emailError}
              />
              {emailError && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 7v6"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 16h.01"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block text-sm mb-2"
              style={{
                fontFamily:
                  "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                fontWeight: 500,
                color: "#475569",
              }}
            >
              Phone Number
            </label>

            <div className="relative">
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 outline-none"
                style={{
                  border: `1px solid ${phoneError ? "#EF4444" : "#CBD5E1"}`,
                  borderRadius: 8,
                  fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                  fontWeight: 400,
                  color: "#1E293B",
                  backgroundColor: "white",
                }}
                aria-invalid={phoneError}
              />
              {phoneError && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 7v6"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 16h.01"
                      stroke="#EF4444"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-sm mb-2"
              style={{
                fontFamily:
                  "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                fontWeight: 500,
                color: "#475569",
              }}
            >
              Your Resume
            </label>
            <div
              className={dropZoneClass}
              onDragEnter={(e) => handleDragEvent(e, "over")}
              onDragOver={(e) => handleDragEvent(e, "over")}
              onDragLeave={(e) => handleDragEvent(e, "leave")}
              onDrop={(e) => handleDragEvent(e, "drop")}
              onClick={() => document.getElementById("resumeUpload")?.click()}
            >
              <UploadIcon />
              <div
                className="text-sm mt-0"
                style={{
                  color: "#64748B",
                  fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                  lineHeight: 1.2,
                }}
              >
                <span style={{ fontWeight: 600 }}>Click to upload</span>
                <span style={{ fontWeight: 400 }}> or drag and drop</span>
              </div>

              <div
                className="text-xs mt-1"
                style={{
                  color: "#64748B",
                  fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                  fontWeight: 400,
                }}
              >
                PDF, DOC, DOCX (MAX. 5MB)
              </div>

              {file && (
                <div
                  className="text-sm mt-2"
                  style={{
                    fontFamily:
                      "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                    fontWeight: 500,
                    color: "#1287FF",
                  }}
                >
                  {file.name}
                </div>
              )}

              <input
                type="file"
                id="resumeUpload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>

            {fileError && (
              <div
                className="text-sm mt-2"
                style={{
                  color: "#EF4444",
                  fontFamily:
                    "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
                }}
              >
                {fileError}
              </div>
            )}
          </div>
        </form>

        {/* footer stuck to bottom of card: divider + 17px gap to button */}
        <div className="w-full">
          <div className="w-full h-px bg-[#E2E8F0]"></div>
          <div className="flex justify-center mt-[17px]">
            <button
              type="submit"
              form="profileForm"
              className="Button inline-flex cursor-pointer px-[35px] py-3 bg-[#1287FF] rounded-2xl shadow-xl text-white text-[18px] font-['Sora'] font-semibold transition-colors transition-shadow duration-300 ease-in-out hover:shadow-none hover:bg-[#0f6fd6] focus:outline-none focus:ring-2 focus:ring-[#1287FF]/30 items-center justify-center"
              style={{
                transition:
                  "background-color 300ms ease, box-shadow 300ms ease",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
