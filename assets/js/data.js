/* ==========================================================================
   NEXORA — central content file.
   Everything editable lives here: contact details, projects, services,
   process steps, technologies and all Arabic / English interface text.
   ========================================================================== */
const NEXORA = {

  /* ---- Contact channels. Leave a value empty to hide that channel. ----
     whatsapp: number with country code, digits only (e.g. "9665xxxxxxxx")
     instagram: username without @      email: full address               */
  contact: { email: "", whatsapp: "", instagram: "" },

  /* ---- Technologies shown on the About page ---- */
  stack: ["HTML", "CSS", "JavaScript", "React", "Firebase", "Vite", "Tailwind CSS"],

  /* ---- Projects ----
     tech:  list of technologies used on that project (section hides if empty)
     shots: list of image paths, e.g. ["assets/img/elbalad-1.jpg"]
            (the gallery section appears once you add screenshots)
     kind:  "web" or "system" — picks the style of the generated preview      */
  projects: [
    {
      slug: "elbalad-water", kind: "web", accent: "#8998A8",
      name: { ar: "البلد للمياه", en: "El Balad Water" },
      cat:  { ar: "موقع إلكتروني", en: "Website" },
      short:{ ar: "موقع تعريفي يقدّم نشاط البلد للمياه بوضوح.", en: "A website that presents El Balad Water clearly." },
      desc: { ar: "موقع إلكتروني صُمم لعرض نشاط البلد للمياه وخدماتها بصورة واضحة ومنظمة، ويسهّل على العملاء معرفة ما تقدمه الشركة والتواصل معها.",
              en: "A website designed to present El Balad Water and its services in a clear, organised way, making it easy for customers to learn what the business offers and get in touch." },
      features: { ar: ["تصميم متجاوب مع جميع الشاشات", "عرض واضح للخدمات والمنتجات", "وسائل تواصل سريعة", "صفحات سريعة التحميل"],
                  en: ["Responsive design for every screen", "Clear presentation of services and products", "Quick ways to get in touch", "Fast-loading pages"] },
      problem:  { ar: "كان النشاط بحاجة إلى حضور رقمي واضح يعرّف العملاء به ويسهّل الوصول إليه.",
                  en: "The business needed a clear digital presence that introduces it to customers and makes it easy to reach." },
      solution: { ar: "صممنا وبنينا موقعًا بسيطًا وسريعًا يعرض المعلومات الأساسية بترتيب مفهوم ويعمل جيدًا على الجوال.",
                  en: "We designed and built a simple, fast website that shows the essentials in a logical order and works well on mobile." },
      tech: [], shots: []
    },
    {
      slug: "keo-studio", kind: "web", accent: "#B49D94",
      name: { ar: "كيو ستوديو", en: "KEO Studio" },
      cat:  { ar: "موقع إلكتروني", en: "Website" },
      short:{ ar: "موقع يعبّر عن هوية KEO Studio وأعماله.", en: "A website that expresses the identity of KEO Studio." },
      desc: { ar: "موقع إلكتروني لـ KEO Studio يعكس هوية الاستوديو ويعرض أعماله وخدماته بأسلوب أنيق وسهل التصفح.",
              en: "A website for KEO Studio that reflects the studio's identity and presents its work and services in an elegant, easy-to-browse way." },
      features: { ar: ["تصميم يعكس هوية الاستوديو", "عرض مرتب للأعمال والخدمات", "تجربة سلسة على الجوال", "تواصل مباشر مع الاستوديو"],
                  en: ["A design that reflects the studio's identity", "Organised presentation of work and services", "A smooth mobile experience", "Direct contact with the studio"] },
      problem:  { ar: "احتاج الاستوديو إلى موقع يعرّف بأعماله ويعطي انطباعًا احترافيًا من أول زيارة.",
                  en: "The studio needed a website that introduces its work and makes a professional first impression." },
      solution: { ar: "بنينا موقعًا يبرز الهوية البصرية للاستوديو ويرتب المحتوى بحيث يصل الزائر بسرعة إلى ما يبحث عنه.",
                  en: "We built a site that highlights the studio's visual identity and arranges content so visitors quickly find what they need." },
      tech: [], shots: []
    },
    {
      slug: "pos-system", kind: "system", accent: "#A7B4A8",
      name: { ar: "نظام نقاط البيع", en: "Business POS System" },
      cat:  { ar: "نظام إدارة أعمال", en: "Business system" },
      short:{ ar: "نظام نقاط بيع لإدارة عمليات البيع اليومية.", en: "A point-of-sale system for managing daily sales." },
      desc: { ar: "نظام نقاط بيع للأعمال يساعد على تنظيم عمليات البيع اليومية وإدارة المنتجات في مكان واحد.",
              en: "A point-of-sale system for businesses that helps organise daily sales and manage products in one place." },
      features: { ar: ["تسجيل عمليات البيع", "إدارة المنتجات", "واجهة سهلة للاستخدام اليومي", "تنظيم العمليات في مكان واحد"],
                  en: ["Recording sales", "Product management", "An interface built for daily use", "Operations organised in one place"] },
      problem:  { ar: "إدارة البيع والمنتجات بطرق متفرقة تستهلك الوقت وتزيد احتمال الأخطاء.",
                  en: "Handling sales and products in scattered ways takes time and makes mistakes more likely." },
      solution: { ar: "جمعنا عمليات البيع وإدارة المنتجات في نظام واحد واضح يسهل على الفريق استخدامه كل يوم.",
                  en: "We brought sales and product management into one clear system that is easy for the team to use every day." },
      tech: [], shots: []
    },
    {
      slug: "studio-management", kind: "system", accent: "#8E9A88",
      name: { ar: "نظام إدارة الاستوديو", en: "Studio Management System" },
      cat:  { ar: "نظام إدارة أعمال", en: "Business system" },
      short:{ ar: "نظام لتنظيم العمل اليومي للاستوديو.", en: "A system for organising a studio's daily work." },
      desc: { ar: "نظام إدارة مصمم لتنظيم العمل اليومي في الاستوديو وتجميع المعلومات المهمة في لوحة واحدة.",
              en: "A management system designed to organise a studio's daily work and bring the important information into one dashboard." },
      features: { ar: ["لوحة تحكم واضحة", "تنظيم العمل اليومي", "معلومات مجمعة في مكان واحد", "واجهة مناسبة للفريق"],
                  en: ["A clear dashboard", "Organised daily work", "Information gathered in one place", "An interface suited to the team"] },
      problem:  { ar: "تفرّق معلومات العمل بين أدوات وملفات متعددة يصعّب المتابعة والتنظيم.",
                  en: "Work information spread across several tools and files makes it harder to follow and organise." },
      solution: { ar: "بنينا نظامًا واحدًا بلوحة تحكم تجمع ما يحتاجه الفريق لمتابعة العمل اليومي.",
                  en: "We built a single system with a dashboard that gathers what the team needs to follow daily work." },
      tech: [], shots: []
    }
  ],

  /* ---- Services ---- */
  services: [
    { id: "websites", accent: "#A7B4A8", examples: ["elbalad-water", "keo-studio"],
      name: { ar: "المواقع الإلكترونية", en: "Websites" },
      desc: { ar: "مواقع سريعة ومتجاوبة تعرّف بنشاطك وتسهّل على عملائك الوصول إليك.", en: "Fast, responsive websites that introduce your business and make it easy for customers to reach you." },
      points: { ar: ["تصميم متجاوب مع الجوال", "دعم العربية والإنجليزية", "وضع فاتح وداكن", "صفحات سريعة التحميل"], en: ["Mobile-first responsive design", "Arabic and English support", "Light and dark modes", "Fast-loading pages"] } },
    { id: "dashboards", accent: "#8998A8", examples: ["pos-system", "studio-management"],
      name: { ar: "لوحات التحكم", en: "Dashboards" },
      desc: { ar: "لوحات تحكم تدير منها المحتوى والبيانات بنفسك دون الحاجة إلى مبرمج.", en: "Dashboards from which you manage your own content and data without needing a developer." },
      points: { ar: ["إدارة المحتوى بسهولة", "عرض البيانات بوضوح", "صلاحيات للمستخدمين", "واجهة مرتبة للاستخدام اليومي"], en: ["Easy content management", "Clear presentation of data", "User permissions", "A tidy interface for daily use"] } },
    { id: "mobile", accent: "#B49D94", examples: [],
      name: { ar: "تطبيقات الجوال", en: "Mobile applications" },
      desc: { ar: "تطبيقات تعمل بسلاسة على الهاتف وتخدم عملاءك وفريقك.", en: "Applications that run smoothly on the phone and serve your customers and your team." },
      points: { ar: ["تطبيقات للعملاء", "تطبيقات للفريق الداخلي", "واجهات مصممة للمس", "تجربة متناسقة مع موقعك"], en: ["Apps for customers", "Apps for internal teams", "Interfaces designed for touch", "An experience consistent with your website"] } },
    { id: "systems", accent: "#8E9A88", examples: ["pos-system", "studio-management"],
      name: { ar: "أنظمة إدارة الأعمال", en: "Business management systems" },
      desc: { ar: "أنظمة تنظّم عملك اليومي، من المبيعات إلى إدارة الفريق، في مكان واحد.", en: "Systems that organise your daily work, from sales to team management, in one place." },
      points: { ar: ["نقاط البيع والمنتجات", "إدارة العمل اليومي", "تقارير ومعلومات مجمعة", "مبنية حول طريقة عملك"], en: ["Point of sale and products", "Daily work management", "Gathered reports and information", "Built around the way you work"] } }
  ],

  /* ---- Process ---- */
  steps: [
    { ar: ["الفكرة والاستكشاف", "نفهم نشاطك وعملاءك وما تريد تحقيقه، ونحدد نطاق المشروع وأولوياته قبل أي تصميم."],
      en: ["Idea and discovery", "We learn about your business, your customers and what you want to achieve, then define the scope and priorities before any design."] },
    { ar: ["التخطيط والتصميم", "نرتب الصفحات والمحتوى ونصمم الواجهات باللغتين وبالوضعين الفاتح والداكن، ونعرضها عليك قبل البناء."],
      en: ["Planning and design", "We structure the pages and content and design the interface in both languages and both themes, then review it with you before building."] },
    { ar: ["البناء", "نبرمج المشروع على مراحل ونعرض لك التقدم باستمرار لتتمكن من التعديل مبكرًا."],
      en: ["Development", "We build the project in stages and show progress regularly so changes can be made early."] },
    { ar: ["الاختبار والمراجعة", "نجرّب المشروع على الجوال والحاسب ونصلح الملاحظات حتى يعمل كما هو متوقع."],
      en: ["Testing and review", "We test on phone and desktop and fix feedback until everything works as expected."] },
    { ar: ["الإطلاق والمتابعة", "ننشر المشروع على الإنترنت ونبقى على تواصل لمعالجة أي ملاحظات بعد الإطلاق."],
      en: ["Launch and follow-up", "We publish the project online and stay in touch to handle anything that comes up after launch."] }
  ],

  /* ---- Interface text ---- */
  i18n: {
    ar: {
      brand: "نيكسورا", skip: "تخطي إلى المحتوى",
      nav_home: "الرئيسية", nav_projects: "أعمالنا", nav_services: "خدماتنا", nav_process: "طريقة العمل", nav_about: "من نحن", nav_contact: "تواصل معنا",
      cta: "ابدأ مشروعك", menu: "القائمة", close: "إغلاق", theme: "تبديل المظهر", language: "اللغة", more: "عرض المشروع",
      h_title: "نبني منتجات رقمية تعمل.", h_sub: "مواقع وتطبيقات وأنظمة إدارة مبنية حول عملك.",
      h_cta2: "شاهد أعمالنا", h_badge: "استوديو برمجيات",
      home_services_t: "ما الذي نبنيه", home_services_p: "أربع خدمات تغطي حضورك الرقمي وأنظمة عملك.",
      home_projects_t: "أعمال مختارة", home_projects_p: "مشاريع حقيقية نفذناها من الفكرة حتى الإطلاق.",
      all_projects: "كل الأعمال", all_services: "كل الخدمات",
      home_cta_t: "هل لديك فكرة؟", home_cta_p: "أخبرنا عن نشاطك وما تحتاجه، وسنقترح عليك الخطوة الأنسب.",
      s_page_t: "خدماتنا", s_page_p: "من الموقع التعريفي إلى نظام إدارة العمل اليومي، نبني ما يناسب نشاطك.",
      s_examples: "أمثلة من أعمالنا", s_includes: "ما تشمله الخدمة", s_ask: "اطلب هذه الخدمة",
      p_page_t: "أعمالنا", p_page_p: "المشاريع التي نفذناها. افتح أي مشروع لتعرف تفاصيله.",
      f_all: "الكل", f_web: "مواقع إلكترونية", f_sys: "أنظمة إدارة أعمال",
      d_overview: "نظرة عامة", d_features: "أبرز المزايا", d_tech: "التقنيات", d_problem: "المشكلة", d_solution: "حلّنا",
      d_gallery: "معرض الصور", d_back: "كل الأعمال", d_next: "المشروع التالي", d_cta_t: "تريد مشروعًا مشابهًا؟", d_cta_p: "تواصل معنا وأخبرنا بما تحتاجه.",
      a_page_t: "من نحن", a_page_p: "نيكسورا استوديو برمجيات صغير، نصمم ونبني مواقع وتطبيقات وأنظمة تخدم الأعمال.",
      a_story_t: "قصتنا",
      a_story: ["نيكسورا استوديو يركّز على بناء منتجات رقمية تعمل فعلًا لأصحابها: مواقع تعرّف بالنشاط، ولوحات تحكم تُدار بسهولة، وأنظمة تنظّم العمل اليومي.",
                "نعمل بفريق صغير حتى يبقى كل مشروع تحت عناية مباشرة، ونصمم كل واجهة بالعربية والإنجليزية وبالوضعين الفاتح والداكن منذ البداية."],
      a_values_t: "كيف نفكر",
      a_values: [["بساطة", "نفضّل الحل الواضح الذي يفهمه المستخدم من أول نظرة."], ["سرعة", "صفحات خفيفة وتجربة سلسة على الجوال قبل الحاسب."], ["عناية", "نهتم بالتفاصيل: الخطوط، المسافات، واتجاه الصفحة بالعربية."]],
      a_skills_t: "مهاراتنا", a_stack_t: "التقنيات التي نستخدمها",
      pr_page_t: "طريقة العمل", pr_page_p: "مسار واضح من الفكرة حتى الإطلاق، تعرف فيه أين وصل مشروعك في كل مرحلة.",
      c_page_t: "تواصل معنا", c_page_p: "أخبرنا عن مشروعك وسنعود إليك.",
      c_form_t: "طلب مشروع", c_name: "الاسم", c_contact: "البريد الإلكتروني أو رقم الجوال", c_service: "نوع المشروع", c_msg: "تفاصيل المشروع",
      c_other: "غير ذلك", c_send: "إرسال الطلب", c_methods: "طرق التواصل", c_err: "يرجى تعبئة الاسم ووسيلة التواصل وتفاصيل المشروع.",
      c_ok_wa: "تم فتح واتساب برسالتك.", c_ok_mail: "تم فتح البريد برسالتك.", c_ok_copy: "تم نسخ رسالتك. الصقها في وسيلة التواصل التي تفضلها.",
      c_wa: "واتساب", c_ig: "إنستغرام", c_mail: "البريد الإلكتروني", c_none: "استخدم نموذج الطلب وسنعود إليك.",
      f_desc: "استوديو برمجيات يبني مواقع وتطبيقات وأنظمة إدارة مبنية حول عملك.", f_nav: "الصفحات", f_serv: "الخدمات", f_contact: "التواصل",
      f_rights: "© 2026 نيكسورا. جميع الحقوق محفوظة.",
      nf_t: "الصفحة غير موجودة", nf_p: "المشروع الذي تبحث عنه غير متوفر."
    },
    en: {
      brand: "Nexora", skip: "Skip to content",
      nav_home: "Home", nav_projects: "Projects", nav_services: "Services", nav_process: "Process", nav_about: "About", nav_contact: "Contact",
      cta: "Start your project", menu: "Menu", close: "Close", theme: "Toggle theme", language: "Language", more: "View project",
      h_title: "We build digital products that work.", h_sub: "Websites, applications and business systems built around your business.",
      h_cta2: "See our work", h_badge: "Software studio",
      home_services_t: "What we build", home_services_p: "Four services covering your digital presence and the systems behind your business.",
      home_projects_t: "Selected projects", home_projects_p: "Real projects, taken from idea to launch.",
      all_projects: "All projects", all_services: "All services",
      home_cta_t: "Have an idea?", home_cta_p: "Tell us about your business and what you need, and we'll suggest the right next step.",
      s_page_t: "Services", s_page_p: "From a company website to a system that runs your daily work, we build what fits your business.",
      s_examples: "Examples from our work", s_includes: "What it includes", s_ask: "Request this service",
      p_page_t: "Projects", p_page_p: "The projects we've built. Open any project to see the details.",
      f_all: "All", f_web: "Websites", f_sys: "Business systems",
      d_overview: "Overview", d_features: "Main features", d_tech: "Technologies", d_problem: "The problem", d_solution: "Our solution",
      d_gallery: "Gallery", d_back: "All projects", d_next: "Next project", d_cta_t: "Want something similar?", d_cta_p: "Get in touch and tell us what you need.",
      a_page_t: "About Nexora", a_page_p: "Nexora is a small software studio that designs and builds websites, applications and systems for businesses.",
      a_story_t: "Our story",
      a_story: ["Nexora is a studio focused on building digital products that actually work for their owners: websites that introduce a business, dashboards that are easy to manage, and systems that organise daily work.",
                "We work as a small team so every project gets direct attention, and we design every interface in Arabic and English, light and dark, from the start."],
      a_values_t: "How we think",
      a_values: [["Simplicity", "We prefer the clear solution a user understands at first glance."], ["Speed", "Light pages and a smooth experience on mobile first, then desktop."], ["Care", "We care about details: type, spacing and proper Arabic page direction."]],
      a_skills_t: "Skills", a_stack_t: "Technologies we use",
      pr_page_t: "How we work", pr_page_p: "A clear path from idea to launch, so you always know where your project stands.",
      c_page_t: "Contact", c_page_p: "Tell us about your project and we'll get back to you.",
      c_form_t: "Project inquiry", c_name: "Name", c_contact: "Email or phone number", c_service: "Project type", c_msg: "Project details",
      c_other: "Something else", c_send: "Send inquiry", c_methods: "Ways to reach us", c_err: "Please fill in your name, a way to reach you and the project details.",
      c_ok_wa: "WhatsApp opened with your message.", c_ok_mail: "Your email app opened with your message.", c_ok_copy: "Your message was copied. Paste it into the channel you prefer.",
      c_wa: "WhatsApp", c_ig: "Instagram", c_mail: "Email", c_none: "Use the inquiry form and we'll get back to you.",
      f_desc: "A software studio building websites, applications and business systems around your business.", f_nav: "Pages", f_serv: "Services", f_contact: "Contact",
      f_rights: "© 2026 Nexora. All rights reserved.",
      nf_t: "Page not found", nf_p: "The project you're looking for isn't available."
    }
  },

  /* ---- Page titles + descriptions (SEO) ---- */
  seo: {
    home:     { ar: ["نيكسورا | نبني منتجات رقمية تعمل", "استوديو برمجيات يبني مواقع وتطبيقات وأنظمة إدارة أعمال مبنية حول عملك."], en: ["Nexora | We build digital products that work", "A software studio building websites, applications and business systems around your business."] },
    services: { ar: ["خدماتنا | نيكسورا", "مواقع إلكترونية، لوحات تحكم، تطبيقات جوال وأنظمة إدارة أعمال."], en: ["Services | Nexora", "Websites, dashboards, mobile applications and business management systems."] },
    projects: { ar: ["أعمالنا | نيكسورا", "مشاريع نيكسورا: البلد للمياه، كيو ستوديو، نظام نقاط البيع ونظام إدارة الاستوديو."], en: ["Projects | Nexora", "Nexora projects: El Balad Water, KEO Studio, the Business POS System and the Studio Management System."] },
    about:    { ar: ["من نحن | نيكسورا", "تعرّف على نيكسورا ومهاراتها والتقنيات التي تستخدمها."], en: ["About | Nexora", "Get to know Nexora, its skills and the technologies it uses."] },
    process:  { ar: ["طريقة العمل | نيكسورا", "كيف نعمل من الفكرة حتى الإطلاق."], en: ["Process | Nexora", "How we work from idea to launch."] },
    contact:  { ar: ["تواصل معنا | نيكسورا", "أرسل طلب مشروعك إلى نيكسورا."], en: ["Contact | Nexora", "Send your project inquiry to Nexora."] }
  }
};
