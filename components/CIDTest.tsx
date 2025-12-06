import React from 'react';
import LazyImage from './LazyImage';

const CIDTest: React.FC = () => {
  // 测试有效的公开 CID
  const testCids = [
    "QmX4Vc4PNyhzaJuGUfC5YxTNuGBwhT8LXrQf5o73NxE4a5", // 一个有效的图片 CID
    "bafybeigijmyswoayhaii7ugz7li5z5ae4wfhkv7p6pobwmpv5jgate6wbq" // 您提供的 CID
  ];
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow m-4">
      <h2 className="text-xl font-bold mb-4">CID 测试组件</h2>
      
      <div className="space-y-6">
        {testCids.map((cid, index) => (
          <div key={index} className="border-b border-slate-200 dark:border-slate-700 pb-6">
            <h3 className="font-medium mb-2">测试 CID {index + 1}:</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 break-all">CID: {cid}</p>
            <LazyImage 
              cid={cid}
              alt={`测试图片 ${index + 1}`}
              className="w-32 h-32 rounded border"
            />
          </div>
        ))}
      </div>
      
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        如果以上图片能正常显示，说明 CID 和网关配置正确。
      </p>
    </div>
  );
};

export default CIDTest;