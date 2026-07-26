import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

const defaultAboutData = {
  nameNe: "विजय पण्डित",
  nameEn: "Bijay Pandit",
  roleNe: "जननेता • स्वतन्त्र सुशासन",
  roleEn: "People's Leader • Independent Governance",
  taglineNe: "नयाँ पुस्ताको नेतृत्व। पारदर्शी शासन। सबैका लागि समुन्नत नेपाल।",
  taglineEn: "New generation leadership. Transparent governance. Prosperous Nepal for all.",
  image: "/bijay_pandit_portrait.png",
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  timeline: [
    {
      year: "२०६० - २०६५",
      title: "विद्यार्थी राजनीति र युवा नेतृत्व",
      desc: "काठमाडौँ विश्वविद्यालयबाट उच्च शिक्षा हासिल गर्दै युवा हकहित र गुणस्तरीय शिक्षाका लागि सामाजिक अभियानको नेतृत्व।"
    },
    {
      year: "२०६६ - २०७२",
      title: "स्थानीय विकास र विपद् व्यवस्थापन",
      desc: "महाभूकम्प २०७२ पछि ५,००० भन्दा बढी परिवारलाई अस्थायी आवास र पुनर्निरमाण अभियानको अगुवाइ।"
    },
    {
      year: "२०७३ - २०७८",
      title: "सांसद र पूर्वाधार सुधार",
      desc: "निर्वाचन क्षेत्रमा ५०+ कि.मी. सडक कालोपत्रे, अत्याधुनिक १५ शैयाको अस्पताल र १००% खानेपानी पहुँच।"
    },
    {
      year: "२०७९ - वर्तमान",
      title: "डिजिटल सुशासन र रोजगारी अभियान",
      desc: "१०,०००+ युवालाई प्रविधि र सीपमूलक तालिम, भ्रष्टाचारविरुद्ध शून्य सहनशीलता र पारदर्शी सुशासन।"
    }
  ]
};

const defaultManifestoData = {
  titleNe: "विजय पण्डित ५-वर्षे चुनावी संकल्प पत्र २०८३",
  titleEn: "Bijay Pandit 5-Year Election Manifesto 2026",
  summaryNe: "पारदर्शी शासन, युवा स्वरोजगार, निःशुल्क स्वास्थ्य र प्रविधिमैत्री शिक्षाका लागि ५-वर्षे विस्तृत मार्गचित्र।",
  summaryEn: "A comprehensive 5-year roadmap for transparent governance, youth employment, and digital infrastructure.",
  contentNe: `१. शिक्षा र प्रविधि (Education & Tech):
- सबै सामुदायिक विद्यालयहरूमा १००% डिजिटल कक्षाकोठा र आईटी ल्याब।
- युवाहरूका लागि निःशुल्क कम्प्युटर ट्रेनिङ र लोकसेवा तयारी।

२. निःशुल्क स्वास्थ्य सेवा (Universal Healthcare):
- हरेक वडामा २४/७ एम्बुलेन्स सेवा र ६० वर्ष माथिका नागरिकलाई निःशुल्क औषधि।
- विशेषज्ञ डाक्टरसहितको घुम्ती स्वास्थ्य क्लिनिक।

३. सडक तथा खानेपानी पूर्वाधार (Smart Infrastructure):
- ५० कि.मी. नमुना सडक कालोपत्रे र धुलोमुक्त सहर अभियान।
- 'एक घर-एक धारा' शुद्ध खानेपानी आयोजना।

४. युवा उद्यमी Startup कोष (रु. ५ करोड):
- बिनाधितो सहुलियतपूर्ण कर्जा र ५,००० नयाँ स्थानीय रोजगारी।

५. हरित पर्यावरण र आधुनिक कृषि (Green Environment):
- १ लाख वृक्षारोपण र जैविक मल कारखाना स्थापना।`,
  contentEn: `1. Education & Technology:
- 100% smart digital classrooms and free IT labs in community schools.
- Free coding, vocational skills, and career training for youth.

2. Healthcare for All:
- 24/7 ward ambulance service and free medical aid for senior citizens.

3. Smart Infrastructure & Clean Water:
- 50 KM paved model roads and 'One Home - One Tap' clean water project.

4. Youth Startup Seed Fund (NPR 5 Crore):
- Collateral-free micro loans to generate 5,000 local employment opportunities.

5. Green Environment & Agri-Tech:
- 100,000 tree plantation drive and organic fertilizer distribution.`
};

const defaultGalleryData = [
  {
    id: '1',
    titleNe: 'युवा, प्रविधि र स्टार्टअप संवाद २०८३',
    titleEn: 'Youth, Innovation & Startup Summit 2026',
    descNe: 'नयाँ बानेश्वरमा हजारौँ युवाहरूको उपस्थितिमा प्रविधिमैत्री रोजगारी, आईटी ल्याब र ५ करोडको नयाँ स्टार्टअप कोषबारे विजय पण्डितको ऐतिहासिक सम्बोधन।',
    descEn: 'Bijay Pandit addressing thousands of energetic youth regarding the NPR 5 Crore startup fund and digital governance.',
    image: '/bijay_pandit_rally.png',
    category: 'speeches',
    date: 'साउन १५, २०८३'
  },
  {
    id: '2',
    titleNe: 'ज्येष्ठ नागरिक स्वास्थ्य शिविर तथा सम्मान',
    titleEn: 'Senior Citizens Healthcare Camp & Honor',
    descNe: 'स्थानीय वडामा आयोजित निःशुल्क स्वास्थ्य परीक्षण शिविर तथा ६० वर्ष माथिका वरिष्ठ नागरिकहरूलाई निःशुल्क औषधि र सम्मान पत्र वितरण।',
    descEn: 'Free medical checkup camp and honor ceremony organized for community senior elders.',
    image: '/bijay_pandit_portrait.png',
    category: 'gallery',
    date: 'साउन १०, २०८३'
  },
  {
    id: '3',
    titleNe: '५० कि.मी. नमुना सडक शिलान्यास तथा निरीक्षण',
    titleEn: '50 KM Model Paved Road Inspection',
    descNe: 'निर्वाचन क्षेत्रभित्र अत्याधुनिक पिच सडक, सीसीटीभी सुरक्षा प्रणाली र स्मार्ट सडक बत्ती जडान कार्यको प्रत्यक्ष स्थलगत अनुगमन।',
    descEn: 'On-site inspection of the 50 KM dust-free model road project and smart streetlights.',
    image: '/bijay_pandit_rally.png',
    category: 'press',
    date: 'असार २५, २०८३'
  }
];

const defaultNewsData = [
  {
    id: '1',
    titleNe: 'युवा स्वरोजगार र स्टार्टअप कोष (रु. ५ करोड) घोषणा',
    titleEn: 'Youth Employment & NPR 5 Crore Startup Fund Announced',
    date: 'साउन १५, २०८३',
    category: 'मुख्य समाचार',
    summaryNe: 'काठमाडौँमा आयोजित विशेष पत्रकार सम्मेलनमा विजय पण्डितद्वारा ५,००० युवाहरूलाई रोजगारी सिर्जना गर्ने गरी ५ करोडको बिउ पुँजी कोषको औपचारिक घोषणा।',
    summaryEn: 'Formal announcement of NPR 5 Crore seed fund to create 5,000 local jobs for youth in Nepal.',
    fullContentNe: `काठमाडौँ - विजय पण्डितले स्थानीय युवाहरूलाई स्वरोजगार र प्रविधि क्षेत्रमा आत्मनिर्भर बनाउने उद्देश्यका साथ रु. ५ करोड बराबरको 'युवा स्टार्टअप कोष' को घोषणा गर्नुभएको छ। 

यस योजना अन्तर्गत बिनाधितो सहुलियतपूर्ण कर्जा, सित्तैमा प्राविधिक तालिम र व्यावसायिक परामर्श केन्द्रहरू सञ्चालन गरिनेछ। प्रथम चरणमा ५,००० युवाहरू प्रत्यक्ष लाभान्वित हुने लक्ष्य राखिएको छ।`,
    image: '/bijay_pandit_rally.png',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '2',
    titleNe: 'सामुदायिक विद्यालयमा १००% डिजिटल कक्षाकोठा अभियान',
    titleEn: '100% Digital Classrooms Campaign in Public Schools',
    date: 'साउन ०८, २०८३',
    category: 'शिक्षा नीति',
    summaryNe: 'सबै सामुदायिक विद्यालयहरूमा उच्च गतिको इन्टरनेट, आधुनिक कम्प्युटर ल्याब र निःशुल्क कोडिङ कक्षा सञ्चालन गर्ने कार्य तीव्र गतिमा अघि बढेको छ।',
    summaryEn: 'High-speed internet and free computer labs being deployed across all community schools.',
    fullContentNe: `काठमाडौँ - सामुदायिक शिक्षा सुधार अभियान अन्तर्गत विजय पण्डितको पहलमा सामुदायिक विद्यालयहरूमा कम्प्युटर ल्याब र डिजिटल स्मार्ट बोर्ड हस्तान्तरण गरिएको छ। 

यस अभियानले गाउँका बालबालिकाहरूलाई पनि आधुनिक प्रविधिसँग जोड्ने विश्वास लिइएको छ।`,
    image: '/bijay_pandit_portrait.png',
    videoUrl: ''
  },
  {
    id: '3',
    titleNe: 'जेष्ठ नागरिक निःशुल्क स्वास्थ्य बीमा तथा एम्बुलेन्स सेवा',
    titleEn: 'Free Senior Citizen Healthcare & Ambulance Network',
    date: 'असार २८, २०८३',
    category: 'जनस्वास्थ्य',
    summaryNe: 'हरेक वडामा २४/७ चौबीसै घण्टा तयारी अवस्थामा रहने एम्बुलेन्स सेवा र वरिष्ठ नागरिकहरूका लागि घरदैलो स्वास्थ्य परीक्षण अभियान।',
    summaryEn: '24/7 ward ambulance network and free doorstep health checks for senior citizens.',
    fullContentNe: `कोटेश्वर - ६० वर्ष माथिका वरिष्ठ नागरिकहरूलाई निःशुल्क औषधि उपचार तथा आकस्मिक सेवाका लागि २४/७ एम्बुलेन्स सञ्जालको सुरुवात गरिएको छ।`,
    image: '/bijay_pandit_rally.png',
    videoUrl: ''
  }
];

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('bijay_admin_logged_in') === 'true';
  });

  const [aboutData, setAboutData] = useState(() => {
    const saved = localStorage.getItem('bijay_about_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultAboutData,
          ...parsed,
          image: parsed.image || defaultAboutData.image,
          videoUrl: parsed.videoUrl !== undefined ? parsed.videoUrl : defaultAboutData.videoUrl
        };
      } catch (e) {
        return defaultAboutData;
      }
    }
    return defaultAboutData;
  });

  const [manifestoData, setManifestoData] = useState(() => {
    const saved = localStorage.getItem('bijay_manifesto_data');
    return saved ? JSON.parse(saved) : defaultManifestoData;
  });

  const [galleryData, setGalleryData] = useState(() => {
    const saved = localStorage.getItem('bijay_gallery_data');
    return saved ? JSON.parse(saved) : defaultGalleryData;
  });

  const [newsData, setNewsData] = useState(() => {
    const saved = localStorage.getItem('bijay_news_data');
    return saved ? JSON.parse(saved) : defaultNewsData;
  });

  const loginAdmin = (phone, password) => {
    if (phone === '9825342161' && password === 'Password@123') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('bijay_admin_logged_in', 'true');
      return { success: true };
    }
    return { success: false, message: 'गलत फोन नम्बर वा पासवर्ड! (Invalid Phone or Password)' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('bijay_admin_logged_in');
  };

  const updateAboutData = (newData) => {
    setAboutData(newData);
    localStorage.setItem('bijay_about_data', JSON.stringify(newData));
  };

  const updateManifestoData = (newData) => {
    setManifestoData(newData);
    localStorage.setItem('bijay_manifesto_data', JSON.stringify(newData));
  };

  const updateGalleryData = (newData) => {
    setGalleryData(newData);
    localStorage.setItem('bijay_gallery_data', JSON.stringify(newData));
  };

  const updateNewsData = (newData) => {
    setNewsData(newData);
    localStorage.setItem('bijay_news_data', JSON.stringify(newData));
  };

  return (
    <AdminContext.Provider 
      value={{ 
        isAdminLoggedIn, 
        loginAdmin, 
        logoutAdmin, 
        aboutData, 
        updateAboutData,
        manifestoData,
        updateManifestoData,
        galleryData,
        updateGalleryData,
        newsData,
        updateNewsData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
