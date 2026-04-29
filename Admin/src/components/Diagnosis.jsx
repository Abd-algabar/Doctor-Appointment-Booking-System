import React from "react";
import ProgressBar from "./UI/ProgressBar ";

const Diagnosis = ({ AiData }) => {
  return (
    <div
      dir="rtl"
      className="direction-rtl text-right w-full min-w-[250px] p-2"
    >
      <div className="border border-[#5f6fff] py-2 px-4 rounded-md shadow-xl bg-gray-100  border-2">
        <p className="text-[#5f6fff] font-bold">التشخيص الرئيسي</p>
        <p>
          {AiData.primaryDiagnosis.name}({AiData.primaryDiagnosis.icd10})
        </p>

        {/* <p>{AiData.primaryDiagnosis.probability}</p> */}
        <ProgressBar percent={AiData.primaryDiagnosis.probability} />
      </div>

      <div className=" mt-4 border border-[#5f6fff] py-2 px-4 rounded-md shadow-xl bg-gray-100  border-2">
        <p className="text-[#5f6fff] font-bold">تشخيصات إضافية</p>
        <div className="space-y-4" dir="rtl">
          {AiData?.differentials?.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-xl bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">{item.name}</p>

                <span className="text-sm font-medium text-blue-600">
                  {item.probability}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500 transition-all"
                  style={{ width: `${item.probability}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className=" mt-4 border border-[#5f6fff] py-2 px-4 rounded-md shadow-xl bg-gray-100  border-2">
        <p className="text-[#5f6fff] font-bold">العلاج والوصفات الطبية</p>

        <table className="w-full border border-gray-300 rounded-lg overflow-scroll">
          <thead className=" bg-[#5f6fff] ">
            <tr>
              <th className="p-2 border">الاسم</th>
              <th className="p-2 border">الجرعة</th>
              <th className="p-2 border">الطريق</th>
              <th className="p-2 border">التكرار</th>
              <th className="p-2 border">المدة</th>
              <th className="p-2 border">ملاحظات</th>
            </tr>
          </thead>

          <tbody>
            {AiData.treatment.medications.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.dose || item.dosage}</td>
                <td className="p-2 border">{item.route}</td>
                <td className="p-2 border">{item.frequency}</td>
                <td className="p-2 border">{item.duration}</td>
                <td className="p-2 border">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Diagnosis;
