import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    CircularProgress,
    Typography,
    Checkbox,
    FormControlLabel,
    Link, Snackbar, Alert
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../../Componenets/CustomIcons";
import AnimateButton from "../../Componenets/CommonComponents/AnimateButton"
import CustomTextField from "../MachinesPage/MantaincePage/CustomTextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import './MembershipPage.css';
//import Image1 from '../../assets/NAF_lobby.webp';
import MembersNafinfo from "./MembershipInfo";

function Membership() {
    const { t, i18n } = useTranslation();
    const [step, setStep] = useState(1); // 1 = email, 2 = mpin, 3 = signup
    const [email, setEmail] = useState("");
    const [mpin, setMpin] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [countryCode, setCountryCode] = useState("+49"); // default Germany
    const [password, setPassword] = useState("");
    const [showMpin, setShowMpin] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success", // "success" | "error" | "warning" | "info"
    });

    const [verificationCode, setVerificationCode] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [isVerifyingCode, setIsVerifyingCode] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { lang } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // -----------------------------
    // Force re-render when language changes
    // -----------------------------
    useEffect(() => {
    }, [i18n.language]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const email = localStorage.getItem("authEmail");

        if (token && email) {
            axios.get("https://api.naf-cloudsystem.de/api/membership-cards/details", {
                headers: { Authorization: `Bearer ${token}` },
                params: { email }
            })
                .then(() => {
                    navigate(`/${lang}/dashboard`, { replace: true });
                })
                .catch(() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("authEmail");
                    navigate(`/${lang}/membership`, { replace: true });
                });
        }
    }, [navigate, lang]);

    // Validation helpers
    const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isValidPhone = (val) => /^[0-9]{7,15}$/.test(val);

    // Step 1: Check email
    const handleCheckEmail = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setMessage(t("membership.msg_enter_valid_email"));
            return;
        }
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.get(
                `https://api.naf-cloudsystem.de/api/check-mail?email=${encodeURIComponent(
                    email
                )}`
            );

            if (response.data.emailExists) {
                setStep(2);
                setMessage(t("membership.msg_email_verified"));
            } else {
                handleSendVerificationCode()
                setMessage(t("membership.msg_email_not_found"));
            }
        } catch (error) {
            setMessage(t("membership.msg_error_checking_email"));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendVerificationCode = async () => {
        if (!isValidEmail(email)) {
            setMessage(t("membership.msg_enter_valid_email"));
            return;
        }
        setMessage("");

        try {
            const response = await axios.post(
                `https://api.naf-cloudsystem.de/api/membership/send-verification-code`,
                null,
                { params: { email } }
            );

            if (response.status === 200) {
                setStep(22); // Move to verification code step
                setMessage(t("membership.msg_verification_code_sent"));
            } else {
                setMessage(t("membership.msg_error_sending_code"));
            }
        } catch (error) {
            console.error(error);
            setMessage(t("membership.msg_error_sending_code"));
        }
    };

    // Step 2: Verify email code for new users
    const handleVerifyEmailCode = async (e) => {
        e.preventDefault();
        if (verificationCode.length !== 6) {
            setMessage(t("membership.msg_enter_valid_code"));
            return;
        }
        setIsVerifyingCode(true);
        setMessage("");

        try {
            const response = await axios.post(
                `https://api.naf-cloudsystem.de/api/membership/verify-code`,
                null,
                { params: { email, code: verificationCode } }
            )

            if (response.status === 200 && response.data.message === "Email verified successfully") {
                setEmailVerified(true);
                console.log("ghoihhhhh");

                setStep(3); // move to email verification step
                setMessage(t("membership.msg_verification_code_verified"));
            } else {
                setMessage(t("membership.msg_error_verifying_code"));
            }

        } catch (error) {
            setMessage(t("membership.msg_error_verifying_code"));
            console.error(error);
        } finally {
            setIsVerifyingCode(false);
        }
    };

    // Step 2: Authenticate with MPIN
    const handleAuthenticate = async (e) => {
        e.preventDefault();
        if (mpin.length !== 6) {
            setMessage(t("membership.helper_mpin_digits"));
            return;
        }
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(
                "https://api.naf-cloudsystem.de/api/membership/authenticate",
                null,
                { params: { email, mpin } }
            );

            if (response.data.refreshToken) {
                // localStorage.setItem("authToken", response.data.refreshToken);
                // localStorage.setItem("authEmail", email);
                // setMessage(t("membership.msg_login_successful"));
                // navigate(`/${lang}/dashboard`, { replace: true });
                localStorage.setItem("authToken", response.data.refreshToken);
                localStorage.setItem("authEmail", email);
                setMessage(t("membership.msg_login_successful"));
                const queryParams = new URLSearchParams(window.location.search);
                const redirect = queryParams.get("redirect");
                if (redirect) {
                    const separator = redirect.includes("?") ? "&" : "?";
                    navigate(`/${lang}${redirect}${separator}skipMpin=true`, { replace: true });
                } else {
                    navigate(`/${lang}/dashboard`, { replace: true });
                }
            } else {
                setMessage(t("membership.msg_invalid_mpin"));
            }
        } catch (error) {
            setMessage(t("membership.msg_login_failed"));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Register new user
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setMessage(t("membership.msg_enter_valid_email"));
            return;
        }
        if (!firstName.trim()) {
            setMessage(t("membership.msg_first_name_required"));
            return;
        }
        if (!lastName.trim()) {
            setMessage(t("membership.msg_last_name_required"));
            return;
        }
        if (!isValidPhone(phone)) {
            setMessage(t("membership.msg_valid_phone_required"));
            return;
        }
        if (password.length !== 6) {
            setMessage(t("membership.helper_mpin_digits"));
            return;
        }
        if (confirmPassword !== password) {
            setMessage(t("membership.helper_mpin_match"));
            return;
        }
        if (!termsAccepted) {
            setMessage(t("membership.msg_terms_required"));
            return;
        }
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(
                "https://api.naf-cloudsystem.de/api/membership/signup",
                {
                    email,
                    firstName,
                    lastName,
                    mobileNumber: `${countryCode} ${phone}`, // include country code with space
                    mpin: password,
                    type: 'Membership',
                }
            );

            if (response.data.message) {
                setMessage(t("membership.msg_registration_successful"));

                // Auto-login immediately
                const loginResponse = await axios.post(
                    "https://api.naf-cloudsystem.de/api/membership/authenticate",
                    null,
                    { params: { email, mpin: password } }
                );

                if (loginResponse.data.refreshToken) {
                    localStorage.setItem("authToken", loginResponse.data.refreshToken);
                    localStorage.setItem("authEmail", email);

                    navigate(`/${lang}/dashboard`, { replace: true });
                } else {
                    setMessage(t("membership.msg_signup_auto_login_failed"));
                    setStep(2);
                }
            } else {
                setMessage(t("membership.msg_registration_failed"));
            }
        } catch (error) {
            setMessage(t("membership.msg_error_registration"));
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotMpin = async () => {
        if (!isValidEmail(email)) {
            setSnackbar({
                open: true,
                message: t("membership.msg_enter_valid_email"),
                severity: "error",
            });
            return;
        }

        try {
            const response = await axios.post(
                "https://api.naf-cloudsystem.de/api/forgot-mpin",
                null,
                { params: { email } }
            );

            if (response.status === 200) {
                setSnackbar({
                    open: true,
                    message: t("membership.msg_mpin_reset_sent"),
                    severity: "success",
                });
            } else {
                setSnackbar({
                    open: true,
                    message: t("membership.msg_request_failed"),
                    severity: "error",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            setSnackbar({
                open: true,
                message: t("membership.msg_something_wrong"),
                severity: "error",
            });
        }
    };

    const handleMpinChange = (value, index) => {
        if (!/^\d?$/.test(value)) {
            setSnackbar({
                open: true,
                message: t('membership.msg_mpin_six_digits'),
                severity: "error",
            });
            return;
        }

        let arr = mpin.split("");
        arr[index] = value || "";
        const updated = arr.join("");
        setMpin(updated);

        // Auto move to next box
        if (value && index < 5) {
            document.getElementById(`mpin-${index + 1}`).focus();
        }
    };

    const handleMpinKeyDown = (e, index) => {
        if (e.key === "Backspace" && !mpin[index] && index > 0) {
            // Move back only if current box already empty
            document.getElementById(`mpin-${index - 1}`).focus();
        }
    };

    const handleMpinPaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").trim();

        if (!/^\d{6}$/.test(paste)) {
            setSnackbar({
                open: true,
                message: "Please paste exactly 6 digits",
                severity: "error",
            });
            return;
        }

        setMpin(paste);
        document.getElementById("mpin-5")?.focus();
    };



    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else if (step === 22) {
            setStep(1);          // Verification
        } else if (step === 3) {
            setStep(22);         // Signup 
        }
    };
    return (
        <Box className="section-container menucontainer">
            <Box sx={{}}>

                {/* </Box> */}
                {/* Left Side */}
                <Box className="main-form-container"

                    sx={{
                        color: "white",
                        p: 4,
                        mb: 6
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 6,
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 6,
                                width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
                            }}
                        >
                            {(step === 22 || step === 3 || step === 2) && (
                                <Box
                                    onClick={handleBack}
                                    sx={{
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        width: "fit-content",
                                        minWidth: { xs: '50px', sm: '50px', md: '50px', lg: '60px' },
                                        zIndex: 10
                                    }}
                                >
                                    <BackButton />
                                </Box>
                            )}

                            <Typography
                                variant="h3"
                                className="headings-h2"
                                fontWeight="bold"
                                sx={{
                                    color: "#FCFCFC",
                                    textAlign: "center",
                                }}
                            >
                                {t("membership.title_login_signup")}
                            </Typography>
                        </Box>
                    </Box>

                    <Box className="form-container"
                        sx={{
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            p: 4,
                        }}>
                        {/* Step 1: Email */}
                        {step === 1 && (
                            <Box
                                component="form"
                                onSubmit={handleCheckEmail}
                                sx={{ width: "100%", maxWidth: 400 }}
                            >
                                <Typography sx={{ mb: 2, color: '#FCFCFC', textAlign: 'center' }} className="bodyRegularText3">
                                    {t("membership.label_enter_email")}
                                </Typography>

                                <CustomTextField
                                    label={t("membership.field_email")}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                                    <div onClick={handleCheckEmail}>
                                        {loading ? (
                                            <CircularProgress size={24} sx={{ color: "white" }} />
                                        ) : (
                                            <AnimateButton text1={t("membership.btn_submit")} text2={t("membership.btn_now")} />
                                        )}
                                    </div>
                                </Box>
                            </Box>
                        )}

                        {/* Step 2: MPIN */}
                        {step === 2 && (
                            <Box
                                component="form"
                                onSubmit={handleAuthenticate}
                                sx={{ width: "100%", maxWidth: 400 }}
                            >
                                <Typography sx={{ mb: 2, color: '#FCFCFC', textAlign: 'center' }} className="bodyRegularText3">
                                    {t("membership.label_enter_mpin")}
                                </Typography>

                                {/* 6-digit MPIN Boxes */}
                                {/* <Box sx={{ display: "flex", justifyContent: "center", gap: { xs: 1, sm: 1.5, md: 2 }, mb: 1 }}>
                                    {[0, 1, 2, 3, 4, 5].map((i) => (
                                        <input
                                            key={i}
                                            id={`mpin-${i}`}
                                            type={showMpin ? "text" : "password"}
                                            maxLength={1}
                                            placeholder="0"
                                            value={mpin[i] || ""}
                                            onChange={(e) => handleMpinChange(e.target.value, i)}
                                            onKeyDown={(e) => handleMpinKeyDown(e, i)}
                                            onPaste={handleMpinPaste}
                                            style={{
                                                width: "54px",
                                                height: "54px",
                                                textAlign: "center",
                                                fontSize: "24px",
                                                borderRadius: "4px",
                                                border: "none",
                                                background: "#595D62",
                                                color: "#C2C2C4",
                                                outline: "none",
                                            }}
                                        />
                                    ))}
                                </Box> */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: { xs: 1, sm: 1.5, md: 2 },
                                        mb: 1,
                                    }}
                                >
                                    {[0, 1, 2, 3, 4, 5].map((i) => (
                                        <Box
                                            key={i}
                                            component="input"
                                            id={`mpin-${i}`}
                                            type={showMpin ? "text" : "password"}
                                            maxLength={1}
                                            placeholder="0"
                                            value={mpin[i] || ""}
                                            onChange={(e) => handleMpinChange(e.target.value, i)}
                                            onKeyDown={(e) => handleMpinKeyDown(e, i)}
                                            onPaste={handleMpinPaste}
                                            sx={{
                                                width: { xs: 40, sm: 48, md: 54 },
                                                height: { xs: 40, sm: 48, md: 54 },
                                                textAlign: "center",
                                                fontSize: { xs: "18px", sm: "20px", md: "24px" },
                                                borderRadius: "6px",
                                                border: "none",
                                                backgroundColor: "#595D62",
                                                color: "#C2C2C4",
                                                outline: "none",
                                            }}
                                        />
                                    ))}
                                </Box>

                                {/* Show / Hide MPIN text Forgot MPIN link  */}
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                    <Typography
                                        onClick={() => setShowMpin(!showMpin)}
                                        sx={{
                                            cursor: "pointer",
                                            color: "#EC6B53",
                                            textDecoration: "underline",
                                            fontSize: "14px"
                                        }}
                                        className="bodyRegularText4"
                                    >
                                        {showMpin ? t("memebersLogin.hide_mpin") : t("memebersLogin.show_mpin")}


                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{ cursor: "pointer", color: "#EC6B53", textDecoration: 'underline' }}
                                        onClick={handleForgotMpin}
                                        className="bodyRegularText4"
                                    >
                                        {t("memebersLogin.ForgotMpin")}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                                    <div onClick={handleAuthenticate}>
                                        {loading ? (
                                            <CircularProgress size={24} sx={{ color: "white" }} />
                                        ) : (
                                            <AnimateButton text1={t("membership.btn_submit")} text2={t("membership.btn_now")} />
                                        )}
                                    </div>
                                </Box>
                            </Box>
                        )}

                        {/* Step 2: Email Verification */}
                        {step === 22 && !emailVerified && (
                            <Box sx={{ width: "100%", maxWidth: 400 }}>

                                <Typography sx={{ mb: 2, color: '#FCFCFC', textAlign: 'center' }} className="bodyRegularText3">
                                    {t("membership.label_enter_details")}
                                </Typography>

                                {/* Email + Verify link inline */}
                                <Box sx={{ mb: 5 }}>
                                    <CustomTextField
                                        label={t("membership.field_email")}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                        required
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -2 }}>
                                        <Typography className="bodyRegularText4">{t('membership.email_sent')}</Typography>
                                        <Link
                                            className="bodyMediumText2"
                                            sx={{ cursor: "pointer", color: "limegreen" }}
                                            onClick={handleSendVerificationCode} // Re-check email existence
                                        >
                                            {t("membership.resend")}
                                        </Link>
                                    </Box>
                                </Box>

                                {/* Show verification code only after clicking Verify for new email */}
                                <Typography  sx={{ mb: 1, color: '#FCFCFC' }}>
                                    {t("membership.label_enter_verification_code")}
                                </Typography>

                                <CustomTextField
                                    label={t("membership.field_verification_code")}
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                                    inputProps={{ maxLength: 6 }}
                                    required
                                />

                                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                                    <div onClick={handleVerifyEmailCode}>
                                        {isVerifyingCode ? (
                                            <CircularProgress size={24} sx={{ color: "white" }} />
                                        ) : (
                                            <AnimateButton text1={t("membership.btn_submit")} text2={t("membership.btn_now")} />
                                        )}
                                    </div>
                                </Box>
                            </Box>
                        )}

                        {/* Step 3: Sign-up */}
                        {step === 3 && (
                            <Box
                                component="form"
                                onSubmit={handleRegister}
                                sx={{ width: "100%", maxWidth: 400 }}
                            >

                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    {t("membership.label_enter_details")}
                                </Typography>

                                <CustomTextField
                                    label={t("membership.field_email")}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <CustomTextField
                                    label={t("membership.field_first_name")}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />

                                <CustomTextField
                                    label={t("membership.field_last_name")}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />

                                <CustomTextField
                                    label={t("membership.field_phone_number")}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\s+/g, ""))}
                                    required
                                />

                                <CustomTextField
                                    label={t("membership.field_mpin")}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    inputProps={{ maxLength: 6, pattern: "[0-9]{6}" }}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ""); // only digits
                                        if (value.length <= 6) setPassword(value);
                                    }}
                                    required
                                    error={password.length > 0 && password.length !== 6}
                                    helperText={
                                        password.length > 0 && password.length !== 6
                                            ? t("membership.helper_mpin_digits")
                                            : ""
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                sx={{ color: "#C2C2C4" }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />

                                <CustomTextField
                                    label={t("membership.field_confirm_mpin")}
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    inputProps={{ maxLength: 6, pattern: "[0-9]{6}" }}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ""); // only digits
                                        if (value.length <= 6) setConfirmPassword(value);
                                    }}
                                    required
                                    error={
                                        (confirmPassword.length > 0 && confirmPassword.length !== 6) ||
                                        (confirmPassword.length === 6 && password.length === 6 && confirmPassword !== password)
                                    }
                                    helperText={
                                        confirmPassword.length > 0 && confirmPassword.length !== 6
                                            ? t("membership.helper_mpin_digits")
                                            : confirmPassword.length === 6 && password.length === 6 && confirmPassword !== password
                                                ? t("membership.helper_mpin_match")
                                                : ""
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                                sx={{ color: "#C2C2C4" }}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />

                                {/* Terms & Conditions Checkbox */}
                                <Box sx={{ mt: 2, mb: 2, position: 'relative', }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={termsAccepted}
                                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                                sx={{
                                                    color: "#C2C2C4",
                                                    maxWidth: '10%',
                                                    '&.Mui-checked': {
                                                        color: "#FA7854",
                                                    },
                                                }}
                                            // required
                                            />
                                        }
                                        label={
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "#C2C2C4",
                                                    fontSize: "0.875rem",
                                                    lineHeight: 1.4,
                                                    ml: 2
                                                }}
                                            >
                                                {t("membership.terms_conditions_text1")}{" "}
                                                <Link
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navigate(`/${lang}/privacy-policy`);
                                                    }}
                                                    sx={{
                                                        color: "#FA7854",
                                                        textDecoration: "underline",
                                                        '&:hover': {
                                                            color: "#ff9470",
                                                            cursor: 'pointer'
                                                        }
                                                    }}
                                                >
                                                    {t("membership.terms_conditions_link")}
                                                </Link>
                                                .  {t("membership.terms_conditions_text2")}
                                            </Typography>
                                        }
                                        sx={{
                                            alignItems: "flex-start",
                                            mt: 1
                                        }}
                                    />
                                </Box>

                                {/* Country Code + Phone */}
                                {/* <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                    <FormControl variant="standard" sx={{ minWidth: 100 }}>
                                        <InputLabel sx={{ color: "#aaa" }}>Code</InputLabel>
                                        <Select
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            sx={{ color: "white" }}
                                        >
                                            {countryCodes.map((c) => (
                                                <MenuItem key={c.dial_code} value={c.dial_code}>
                                                    {c.name} ({c.dial_code})
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Phone Number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\s+/g, ""))} // strip spaces from user typing
                                        InputProps={{
                                            startAdornment: (
                                                <Typography sx={{ color: "white", mr: 1 }}>
                                                    {countryCode}&nbsp;
                                                </Typography>
                                            ),
                                            style: { color: "white" }
                                        }}
                                        InputLabelProps={{ style: { color: "#aaa" } }}
                                        required
                                    />
                                </Box> */}

                                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                                    <div onClick={handleRegister}>
                                        {loading ? (
                                            <CircularProgress size={24} sx={{ color: "white" }} />
                                        ) : (
                                            <AnimateButton text1={t("membership.btn_submit")} text2={t("membership.btn_now")} />
                                        )}
                                    </div>
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {message && (
                        <Typography sx={{ mt: 2, color: "limegreen", textAlign: 'center' }}>{message}</Typography>
                    )}
                </Box>



            </Box>
            <MembersNafinfo />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Box >
    );
}

export default Membership;