import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateGenerator = ({ achievement }) => {
  const [userName, setUserName] = useState('');
  const certificateRef = useRef(null);

  const handleGenerateCertificate = async () => {
    if (!userName) {
      alert('请输入您的姓名');
      return;
    }

    // 生成证书
    const canvas = await html2canvas(certificateRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const imgWidth = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${achievement.title}_证书.pdf`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">证书生成</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">您的姓名</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="请输入您的姓名"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">证书预览</h3>
        <div 
          ref={certificateRef}
          className="border-2 border-gray-300 p-8 bg-[#f8f9fa] relative"
          style={{ width: '100%', height: '400px' }}
        >
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-800 mb-8">证书</div>
            <div className="text-2xl font-semibold text-gray-700 mb-4">兹证明</div>
            <div className="text-3xl font-bold text-blue-600 mb-6">{userName || '__________'}</div>
            <div className="text-xl text-gray-700 mb-8">已成功完成 {achievement?.title || '__________'} 成就</div>
            <div className="text-gray-600">颁发日期: {new Date().toLocaleDateString()}</div>
            <div className="absolute bottom-8 right-8 text-gray-600">
              <div className="mb-2">签名</div>
              <div className="w-32 h-1 bg-gray-400"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleGenerateCertificate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
        >
          生成并下载证书
        </button>
      </div>
    </div>
  );
};

export default CertificateGenerator;