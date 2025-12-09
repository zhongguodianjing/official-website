import React from 'react';
import LazyImage from './LazyImage';
import PinataDataDisplay from './PinataDataDisplay';

const IPFSTest: React.FC = () => {
  // 测试 CID，这是一个有效的图片 CID
  const testImageCid = "QmX4Vc4PNyhzaJuGUfC5YxTNuGBwhT8LXrQf5o73NxE4a5";
  
  // 测试 JSON 数据 CID
  const testDataCid = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow m-4">
      <h2 className="text-xl font-bold mb-4">IPFS 测试组件</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">IPFS 图片测试:</h3>
        <LazyImage 
          cid={testImageCid}
          alt="测试图片"
          className="w-32 h-32 rounded border"
        />
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">IPFS 数据测试:</h3>
        <PinataDataDisplay 
          cid={testDataCid}
          className="mt-2"
        />
      </div>
      
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        如果以上组件正常显示图片和数据，说明 IPFS 功能工作正常。
      </p>
    </div>
  );
};

export default IPFSTest;