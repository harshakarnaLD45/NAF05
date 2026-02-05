import {
    Box, Typography, Grid, Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";

import {
    ArrowDropDown,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { FoodservationIcon, Qrscanner, Livemenu, Machinelocations, MembersPersonIcon, WalletOrangeicon, Blocksicon, MembersVerfiedIcon, CentralAccessIcon, VendingMachineIcon, BadgeIconOrange } from "../../Components/CustomIcons";
import wallet from "../../assets/membership/Wallet.png";
import cashless from "../../assets/membership/cashless.png";
import qrcode from "../../assets/membership/qrcode.png";
import transactions from "../../assets/membership/transactions.png";
import playstore from "../../assets/Home/Google Play.svg";
import applestore from "../../assets/Home/App Store.svg";
import NafAppmobile from "../../assets/membership/IphoneApp.png";
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
const MembersNafinfo = () => {

    const { t } = useTranslation();
    const { lang } = useParams();
    const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);


 useEffect(() => {
        if (lang && i18n.language !== lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang]);

    const steps = [
        {
            step: "1",
            title: t('membershipinfo.step1Title'),
            desc: t('membershipinfo.step1Desc'),
        },
        {
            step: "2",
            title: t('membershipinfo.step2Title'),
            desc: t('membershipinfo.step2Desc'),
        },
        {
            step: "3",
            title: t('membershipinfo.step3Title'),
            desc: t('membershipinfo.step3Desc'),
        },
        {
            step: "4",
            title: t('membershipinfo.step4Title'),
            desc: t('membershipinfo.step4Desc'),
        },
    ];

    const faqData = [
        {
            question: t('membershipinfo.faqQuestion1'),
            answer: t('membershipinfo.faqAnswer1'),
        },
        {
            question: t('membershipinfo.faqQuestion2'),
            answer: t('membershipinfo.faqAnswer2'),
        },
        {
            question: t('membershipinfo.faqQuestion3'),
            answer: t('membershipinfo.faqAnswer3'),
        },
        {
            question: t('membershipinfo.faqQuestion4'),
            answer: t('membershipinfo.faqAnswer4'),
        },
        {
            question: t('membershipinfo.faqQuestion5'),
            answer: t('membershipinfo.faqAnswer5'),
        },
        {
            question: t('membershipinfo.faqQuestion6'),
            answer: t('membershipinfo.faqAnswer6'),
        },
    ];

    const features = [
        {
            title: t('membershipinfo.featureCardMembershipTitle'),
            desc: t('membershipinfo.featureCardMembershipDesc'),
            icon: <MembersPersonIcon />,
        },
        {
            title: t('membershipinfo.featureCardWalletTitle'),
            desc: t('membershipinfo.featureCardWalletDesc'),
            icon: <WalletOrangeicon />,
        },
        {
            title: t('membershipinfo.featureCardAppTitle'),
            desc: t('membershipinfo.featureCardAppDesc'),
            icon: <Blocksicon />,
        },
    ];

    const featuresTitles = [
        {
            title: t('membershipinfo.appFeatureFoodReservationTitle'),
            desc: t('membershipinfo.appFeatureFoodReservationDesc'),
        },
        {
            title: t('membershipinfo.appFeatureScanPayTitle'),
            desc: t('membershipinfo.appFeatureScanPayDesc'),
        },
        {
            title: t('membershipinfo.appFeatureLiveMenuTitle'),
            desc: t('membershipinfo.appFeatureLiveMenuDesc'),
        },
        {
            title: t('membershipinfo.appFeatureMachineLocatorTitle'),
            desc: t('membershipinfo.appFeatureMachineLocatorDesc'),
        },
    ];
    const benefits = [
        {
            text: t('membershipinfo.benefitFasterCheckout'),
            icon: <BadgeIconOrange />,
        },
        {
            text: t('membershipinfo.benefitCentralAccess'),
            icon: <CentralAccessIcon />,
        },


    ];
    const benefits2 = [
        {
            text: t('membershipinfo.benefitMemberOffers'),
            icon: <MembersVerfiedIcon />,
        },
        {
            text: t('membershipinfo.benefitSeamlessExperience'),
            icon: <VendingMachineIcon />,
        },
    ];



    const cards = [
        {
            title: t('membershipinfo.walletFeature1'),
            image: wallet,
        },
        {
            title: t('membershipinfo.walletFeature2'),
            image: transactions,
        },
        {
            title: t('membershipinfo.walletFeature3'),
            image: qrcode,
        },
        {
            title: t('membershipinfo.walletFeature4'),
            image: cashless,
        },
    ];


    const appFeatures = [
        {
            title: t('membershipinfo.appFeatureFoodReservationTitle'),
            desc: t('membershipinfo.appFeatureFoodReservationDesc'),
            icon: <FoodservationIcon />,
        },
        {
            title: t('membershipinfo.appFeatureScanPayTitle'),
            desc: t('membershipinfo.appFeatureScanPayDesc'),
            icon: <Qrscanner />,
        },
        {
            title: t('membershipinfo.appFeatureLiveMenuTitle'),
            desc: t('membershipinfo.appFeatureLiveMenuDesc'),
            icon: <Livemenu />,
        },
        {
            title: t('membershipinfo.appFeatureMachineLocatorTitle'),
            desc: t('membershipinfo.appFeatureMachineLocatorDesc'),
            icon: <Machinelocations />,
        },
    ];

    return (
        <Box  sx={{  mt: { xs: "80px", sm: "120px", md: "160px", lg: "200px" }, px: { xs: 0, sm: 4, md: 6, lg: 0 } }}>
            <Box
                sx={{
                    width: "100%",
                }}
            >
                {/* Header */}
                <Box sx={{ mb: { xs: 4, sm: 6, md: 8 }, mt: { xs: 3, sm: 4, md: 6 } }}>
                    <Typography className="headings-h2"
                        sx={{
                            color: "#FCFCFC",
                            mb: 2,
                            fontSize: { xs: "28px", sm: "36px", md: "44px" },
                        }}
                    >
                        {t('membershipinfo.oneAccountTitle')}
                    </Typography>

                    <Typography className="bodyRegularText3"
                        sx={{
                            color: "#C2C2C4",
                            lineHeight: 1.7,
                            maxWidth: { xs: "100%", md: "80%", lg: "70%" },
                        }}
                    >
                        {t('membershipinfo.oneAccountDesc')}
                    </Typography>
                </Box>

                {/* Cards */}
                <Box >
                    <Box sx={{ 
                        display: "flex", 
                        gap: 2,
                        flexDirection: { xs: "column", sm: "column", md: "row" },
                    }}>
                        {features.map((item, index) => (
                            <Box flex={1} key={index}>
                                <Box
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        background:
                                            "linear-gradient(180deg, #151515 0%, #0f0f0f 100%)",
                                        border: "1px solid #2a2a2a",
                                        borderRadius: "20px",
                                        
                                        p: { xs: 3, sm: 3.5, md: 4 },
                                        minHeight:"180px",
                                    
                                    }}
                                >
                                    {/* Icon */}
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: "50%",
                                            backgroundColor: "#FA7854",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mb: 3,
                                            color: "#000",
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                    <Box>
                                        {/* Text */}
                                        <Typography className="bodyMediumText1"
                                            sx={{
                                                color: "#FCFCFC",
                                                mb: 1,
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        <Typography className="bodyRegularText3"
                                            sx={{
                                                color: "#C2C2C4",
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {item.desc}
                                        </Typography>
                                    </Box>

                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            {/* 2section */}
            <Box sx={{
                width: "100%",
                mt: { xs: "80px", sm: "150px", md: "250px", lg: "350px" },
            }}>
                <Box>
                    <Box>
                        <Box sx={{ 
                            display: "flex", 
                            gap: { xs: 4, md: 4 },
                            justifyContent: 'space-between',
                            flexDirection: { xs: "column", lg: "row" },
                        }}>
                            {/* LEFT CONTENT */}
                            <Box sx={{ width: { xs: '100%', lg: '45%' } }}>
                                <Typography className="bodyRegularText3"
                                    sx={{
                                        color: "#7FEE64",
                                        mb: 2,
                                    }}
                                >
                                    {t('membershipinfo.membershipSectionLabel')}
                                </Typography>

                                <Typography className="headings-h2"
                                    sx={{
                                        color: "#FCFCFC",
                                        mb: 1,
                                        fontSize: { xs: "28px", sm: "36px", md: "44px" },
                                    }}
                                >
                                    {t('membershipinfo.membershipBenefitsTitle')}
                                </Typography>

                                <Typography className="bodyRegularText3"
                                    sx={{
                                        color: "#C2C2C4",

                                    }}
                                >
                                    {t('membershipinfo.membershipBenefitsDesc')}
                                </Typography>
                            </Box>

                            {/* RIGHT CARDS */}
                            <Box sx={{ 
                                display: "flex", 
                                width: { xs: '100%', lg: '45%' }, 
                                gap: 1,
                                justifyContent: { xs: 'flex-start', lg: 'flex-end' },
                                flexDirection: { xs: 'column', sm: 'row' },
                            }}>
                                <Box sx={{ width: { xs: "100%", sm: "50%", lg: "100%" } }} >
                                    {benefits.map((item, index) => (
                                        <Box flex={1} key={index} sx={{ mb: 1, }}>
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                    background:
                                                        "linear-gradient(180deg, #151515 0%, #0f0f0f 100%)",
                                                    border: "1px solid #2a2a2a",
                                                    borderRadius: "20px",
                                                    minHeight: { xs: '160px', md: '200px' },
                                                    p: { xs: 3, md: 4 },

                                                }}
                                            >
                                                {/* Icon */}
                                                <Box
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: "50%",

                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        mb: 3,
                                                        color: "#000",
                                                    }}
                                                >
                                                    {item.icon}
                                                </Box>
                                                <Box>
                                                    {/* Text */}
                                                    <Typography className="bodyRegularText3"
                                                        sx={{
                                                            color: "#FCFCFC",
                                                            mb: 1,
                                                        }}
                                                    >
                                                        {item.text}
                                                    </Typography>


                                                </Box>

                                            </Box>
                                        </Box>
                                    ))}



                                </Box>
                                <Box sx={{ width: { xs: "100%", sm: "50%", lg: "100%" }, pt: { xs: 0, sm: 10 } }} >
                                    {benefits2.map((item, index) => (
                                        <Box flex={1} key={index} sx={{ mb: 2, minheight: '550px', }}>
                                            <Box
                                                sx={{
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                    background: "linear-gradient(180deg, #151515 0%, #0f0f0f 100%)",
                                                    border: "1px solid #2a2a2a",
                                                    borderRadius: "20px",
                                                    p: { xs: 3, md: 3 },
                                                    minHeight: { xs: '160px', md: '200px' },

                                                }}
                                            >
                                                {/* Icon */}
                                                <Box
                                                    sx={{
                                                        width: 48,
                                                        height: 48,
                                                        borderRadius: "50%",

                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        mb: 3,
                                                        color: "#000",
                                                    }}
                                                >
                                                    {item.icon}
                                                </Box>
                                                <Box>
                                                    {/* Text */}
                                                    <p className="bodyRegularText3"
                                                        sx={{
                                                            color: "#FCFCFC",
                                                            mb: 1,
                                                        }}
                                                    >
                                                        {item.text}
                                                    </p>


                                                </Box>

                                            </Box>
                                        </Box>
                                    ))}



                                </Box>

                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>


            {/* 3section */}
            <Box sx={{ mt: { xs: "80px", sm: "150px", md: "200px", lg: "250px" } }}>
                <Box sx={{ mb: { xs: 4, sm: 6, md: 8 }, mt: { xs: 3, sm: 4, md: 6 }, display: "flex", flexDirection: "column" }}>
                    {/* Header */}
                    <Box
                        sx={{
                            textAlign: "center",
                            maxWidth: { xs: "100%", sm: "600px", md: "700px" },
                            mx: "auto",
                            mb: { xs: 4, sm: 6, md: 8 },
                        }}
                    >
                        <Typography className="bodyRegularText3"
                            sx={{
                                color: "#7CFF7C",
                                mb: 2,
                            }}
                        >
                            {t('membershipinfo.walletSectionLabel')}
                        </Typography>

                        <Typography className="headings-h2"
                            sx={{
                                color: "#FCFCFC",
                                fontSize: { xs: "28px", sm: "36px", md: "44px" },
                                fontWeight: 700,
                                lineHeight: 1.2,
                                mb: 2,
                            }}
                        >
                            {t('membershipinfo.walletTitle')}
                        </Typography>

                        <Typography className="bodyRegularText3"
                            sx={{
                                color: "#C2C2C4",
                                mx: "auto",
                            }}
                        >
                            {t('membershipinfo.walletDesc')}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" },
                    gap: { xs: 2, sm: 2.5, md: '20px' }, 
                    mb: 4 
                }}>
                    {cards.map((item, index) => (
                        <Box key={index} >
                            <Box
                                sx={{
                                    height: "100%",
                                    background: "linear-gradient(180deg, #1a1a1a 0%, #101010 100%)",
                                    border: "1px solid #2a2a2a",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    display: "flex",
                                    minHeight: { xs: '100%', sm: '320px', md: '350px' },
                                    flexDirection: "column",

                                }}
                            >
                                {/* Image Placeholder */}
                                <Box
                                    sx={{
                                        minHeight: { xs: '200px', sm: '250px', md: '300px' },
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                    }}
                                >
                                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                                </Box>

                                {/* Text */}
                                <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                                    <Typography className="bodyRegularText4"
                                        sx={{
                                            color: "#FCFCFC",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* 4section */}
        
            {/* 5section */}
            <Box sx={{ mt: { xs: "80px", sm: "150px", md: "200px", lg: "250px" }, mb: { xs: 10, md: 20 } }}>
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    {/* Title */}
                    <Typography className="headings-h2"
                        sx={{
                            textAlign: "center",
                            mb: { xs: 4, sm: 6, md: 8 },
                            fontSize: { xs: "28px", sm: "36px", md: "44px" },
                        }}
                    >
                        {t('membershipinfo.howItWorksTitle')}
                    </Typography>

                    {/* Steps Row */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr 1fr" },
                            gap: { xs: 4, sm: 3, md: 4 },
                        }}
                    >
                        {steps.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",

                                }}
                            >
                                {/* Circle */}
                                <Box className="headings-h4"
                                    sx={{
                                        display: "flex",
                                        width: { xs: "80px", md: "100px" },
                                        padding: { xs: "18px", md: "30px" },
                                        justifyContent: "center",
                                        alignItems: "center",
                                        aspectRatio: "1 / 1",
                                        borderRadius: "50%",
                                        background: "#393939",
                                        color:'#9D9EA1',
                                        mb: { xs: 3, md: 5 },
                                    }}
                                >
                                    {item.step}
                                </Box>

                                {/* Title */}
                                <Typography className="bodyMediumText1"
                                    sx={{
                                        color: "#FCFCFC",
                                        mb: 1,
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                {/* Description */}
                                <Typography className="bodyRegularText3"
                                    sx={{
                                        color: "#C2C2C4",
                                    }}
                                >
                                    {item.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* FAQ Section */}
            <Box sx={{ mt: { xs: 6, sm: 10, md: 25 }, py: { xs: 4, sm: 6, md: 8 }, width: '100%' }}>
                <Box sx={{ mb: { xs: 4, sm: 5, md: 7 }, textAlign: 'center' }}>
                    <Typography className="headings-h2" sx={{ color: '#fcfcfc', fontSize: { xs: "28px", sm: "36px", md: "44px" } }}>
                        {t('membershipinfo.faqTitle')}
                    </Typography>
                    <Typography className="bodyMediumText2" sx={{ color: '#C2C2C4' }}>
                         {t('membershipinfo.faqSubtitle')}
                    </Typography>
                </Box>

                <Box sx={{ width: { xs: '100%', sm: '90%', md: '70%', lg: '40%' }, mx: 'auto' }}>
                    {faqData.map((faq, index) => (
                        <Accordion
                            key={index}
                            expanded={expandedFaqIndex === index}
                            onChange={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                            sx={{
                                py: { xs: 1.5, md: 2 },
                                border: '1px solid #393939',
                                backgroundColor: 'transparent',
                                color: '#C2C2C4',
                                borderRadius: '12px !important',
                                boxShadow: 'none',
                                mb: 2,
                                '&::before': { display: 'none' },
                            }}
                        >
                            <AccordionSummary expandIcon={<ArrowDropDown sx={{ color: '#C2C2C4' }} />}>
                                <Typography className="bodyRegularText4" sx={{fontWeight:'700',}}>
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className="bodyRegularText4">
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

            </Box>
        </Box>
    )
}

export default MembersNafinfo