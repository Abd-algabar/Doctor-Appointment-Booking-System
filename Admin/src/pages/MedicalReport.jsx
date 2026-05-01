import React from "react";
import { assets } from "../assets/assets_admin/assets";
import html2pdf from "html2pdf.js";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CancelLoadingSpinner from "../components/UI/CancelLoadingSpinner";
import { useParams } from "react-router-dom";
const MedicalReport = () => {
//   const data = {
//     success: true,
//     AiData: {
//       summary:
//         "مريض يعاني من تاريخ مزمن لربو الأطفال، تعرض مؤخراً لسلسلة من النوبات التنفسية بدأت بعدوى فيروسية وتطورت إلى التهاب قصبات حاد، مما أدى بدوره إلى تفاقم حالة الربو. أظهر المريض استجابة جيدة للعلاجات الاستنشاقية (Budesonide/Salbutamol)، لكنه لا يزال يظهر حساسية تجاه المثيرات البيئية وتغيرات الطقس.",
//       clinicalCourse: {
//         pattern: "متكرر مع تحسن تدريجي",
//         analysis:
//           "بدأت الحالة كعدوى بسيطة في الجهاز التنفسي العلوي، لكنها تطورت سريعاً لتشمل الجهاز التنفسي السفلي وتستثير الربو الكامن. نلاحظ انتقال التشخيص من عدوى فيروسية إلى التهاب قصبات ثم تفاقم ربو، مما يشير إلى أن المشكلة الأساسية الحالية هي فرط استجابة القصبات (Bronchial Hyperreactivity) الناجم عن محفزات خارجية.",
//       },
//       keyProblems: [
//         "تفاقم الربو (Asthma Exacerbation) الناتج عن عدوى تنفسية",
//         "تحسس قصبي مرتبط بالعوامل الجوية",
//         "الحاجة لضبط الخطة الوقائية طويلة الأمد",
//       ],
//       treatmentEffectiveness: {
//         response: "جيد",
//         notes:
//           "الاستجابة كانت محدودة للمسكنات والمضادات الحيوية في البداية، لكن لوحظ تحسن سريري واضح فور إدخال الكورتيكوستيرويدات الاستنشاقية وموسعات القصبات، مما يؤكد الطبيعة التحسسية/الربوية للحالة.",
//       },
//       riskAssessment: {
//         level: "متوسط",
//         reasons: [
//           "تاريخ مرضي سابق بالربو",
//           "سرعة تأثر المريض بالمتغيرات الجوية",
//           "احتمالية تكرار النوبات في حال عدم الالتزام بالعلاج الوقائي",
//         ],
//         redFlags: [
//           "ضيق تنفس شديد لا يستجيب للبخاخ الإسعافي",
//           "استخدام عضلات التنفس المساعدة",
//           "انخفاض مستوى الوعي أو زرقة في الأطراف",
//         ],
//       },
//       recommendations: {
//         nextSteps: [
//           "وضع خطة عمل للربو (Asthma Action Plan)",
//           "متابعة دورية لقياس كفاءة الرئة",
//           "تقييم الحاجة لاستمرار مضادات الهيستامين لفترة أطول",
//         ],
//         tests: [
//           "اختبار وظائف الرئة (Spirometry) بعد استقرار الحالة تماماً",
//           "فحص الحساسية (Allergy Testing) لتحديد المثيرات بدقة",
//         ],
//         lifestyle: [
//           "تجنب التدخين (السلبي والإيجابي)",
//           "تغطية الأنف والفم أثناء تغيرات الطقس المفاجئة",
//           "الالتزام بالبخاخ الوقائي حتى في غياب الأعراض",
//         ],
//       },
//       patientFriendlySummary:
//         "بدأت حالتك بنزلة برد عادية، لكنها أدت إلى تهيج في الربو الذي تعاني منه منذ الطفولة. العلاجات الحالية ساعدت في السيطرة على ضيق التنفس بشكل جيد. من المهم جداً الاستمرار على البخاخ الواقي (Budesonide) بانتظام وتجنب الغبار والروائح القوية وتغيرات الجو، لأن قصباتك الهوائية لا تزال في حالة حساسية عالية.",
//     },
//   };


  const [data, setData] = React.useState(null);
  const {backendUrl}=useContext(AppContext)
  const { id } = useParams();
  const getMedicalReportData = async () => {
     const cacheKey = `report_${id}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    setData(JSON.parse(cached));
    return;
  }
    try {

         const {data}= await axios.post(backendUrl+"/ai/CreateMedicalReport",{patient_id:id});
         console.log(data)
        if(data.success){
            setData(data);
            // console.log("Profile Data fetched:",data.doctorData);
              localStorage.setItem(cacheKey, JSON.stringify(data));
        }else{
            toast.error(data.message);
        }
        
    } catch (error) {
        toast.error("Error fetching medical report data: " + error.message);
    }
  }

 



useEffect(()=>{
    getMedicalReportData();
},[id])

  return (
    
    <>{
       data?

      <div
        dir="rtl"
        className=" h-[900px] w-[800px] mx-auto m-10 px-12 py-8 bg-white"
        id="report"
      >
        <p dir="ltr" className="text-xl">
          Medical Report:
        </p>
        <p dir="ltr" className="text-gray-700">
          date: {new Date().toLocaleDateString("en")}
        </p>

        <p className="text-center mt-4 text-2xl mb-2 text-[#5f6fff]">
          تقيم حالة المريض
        </p>
        <div className="border  border-[#5f6fff] p-2 rounded-md shadow-md border-2 ">
          <p className="mt-[-34px] bg-white w-fit px-2 py-3 font-semibold text-[#5f6fff]">
            ملخص الحالة:
          </p>
          <p className="mt-[-8px] text-sm text-gray-600">
            {data.AiData.summary}
          </p>
        </div>

        <div className="border border-[#5f6fff] p-2 rounded-md shadow-md mt-8  border-2  ">
          <p className="mt-[-34px] bg-white w-fit px-2 py-3 font-semibold text-[#5f6fff]">
            {" "}
            المسار السريري:
          </p>

          <div className=" mt-[-8px] flex items-center gap-2">
            <p className="font-semibold text-gray-700">النمط:</p>

            <p className=" text-sm text-gray-600">
              {data.AiData.clinicalCourse.pattern}
            </p>
          </div>

          <div className="  flex  gap-2">
            <p className="font-semibold text-gray-700"> التحليل:</p>

            <p className=" text-sm text-gray-600">
              {data.AiData.clinicalCourse.analysis}
            </p>
          </div>
        </div>

        <div className=" flex items-start  gap-3">
          <div className=" min-h-[250px] min-w-[200px] border  border-[#5f6fff] p-2 rounded-md shadow-md mt-8  border-2  ">
            <div className="flex items-center gap-2 ">
              <img src={assets.note} className="pb-1 w-6" alt="" />
              <p className="text-[#5f6fff] font-semibold">المشكلات الرئيسية:</p>
            </div>

            <div>
              <ul>
                {data.AiData.keyProblems.map((problem, index) => (
                  <li key={index} className=" text-sm text-gray-600">
                    - {problem}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className=" min-h-[250px] min-w-300px border border-[#5f6fff] p-2 rounded-md shadow-md mt-8  border-2  ">
            <div className="flex items-center gap-2">
              <img src={assets.like} className="w-6 pb-1" alt="" />
              <p className="text-[#5f6fff] font-semibold"> فعالية العلاج :</p>
            </div>

            <div>
              <div className="flex  gap-2 items-center">
                <p className="font-semibold text-gray-700">الاستجابة :</p>
                <p className="  text-gray-600">
                  {" "}
                  {data.AiData.treatmentEffectiveness.response}{" "}
                </p>
              </div>

              <p className="font-semibold text-gray-700">
                {" "}
                ملاحظات:{" "}
                <span className=" text-sm font-normal  text-gray-600">
                  {data.AiData.treatmentEffectiveness.notes}
                </span>{" "}
              </p>
            </div>
          </div>

          <div className=" min-h-[250px] min-w-[300px] border border-[#5f6fff] p-2 rounded-md shadow-md mt-8  border-2  ">
            <div className="flex items-center gap-2">
              <img src={assets.risk} className="w-6" alt="" />
              <p className="text-[#5f6fff] font-semibold"> تقيم المخاطر:</p>
            </div>

            <p className="font-semibold text-gray-700">
              المستوى:{" "}
              <span className=" text-sm font-normal  text-gray-600">
                {data.AiData.riskAssessment.level}
              </span>
            </p>

            <div>
              <ul>
                {data.AiData.riskAssessment.reasons.map((problem, index) => (
                  <li key={index} className=" text-sm text-gray-600">
                    - {problem}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 bg-red-500 p-2 text-white rounded-md">
              <p className="font-semibold">علامات الخطر:</p>
              <ul>
                {data.AiData.riskAssessment.redFlags.map((problem, index) => (
                  <li key={index} className=" text-sm ">
                    - {problem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-xl font-semibold mt-4">التوصيات:</p>

        <div className="flex items-stretch  justify-center gap-4 w-full">
          <div className=" flex-1  border border-[#5f6fff] p-2 rounded-md shadow-md   border-2  ">
            <p className="text-[#5f6fff] font-semibold">
              {" "}
              الخطوات القادمة والفحوصات
            </p>

            <div>
              <ul>
                {data.AiData.recommendations.nextSteps.map((problem, index) => (
                  <li key={index} className=" text-sm text-gray-600">
                    - {problem}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3">
              <p className="font-semibold"> الفحوصات المطلوبة:</p>
              <ul>
                {data.AiData.recommendations.tests.map((problem, index) => (
                  <li key={index} className=" text-sm text-gray-700 ">
                    - {problem}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className=" flex-1    border-[#5f6fff] p-2 rounded-md shadow-md  border-2  ">
            <p className="text-[#5f6fff] font-semibold"> نمط الحياة: </p>

            <div>
              <ul>
                {data.AiData.recommendations.lifestyle.map((problem, index) => (
                  <li key={index} className=" text-sm text-gray-600">
                    - {problem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      : <div className="w-[100%] h-[100vh]  flex items-center justify-center">
           <CancelLoadingSpinner className="" size="large" color="primary" />
      </div>
    }
    
    </> 
   
  );
};

export default MedicalReport;
