/// <reference types="vite/client" />

import { PinataSDK } from "pinata";

// 初始化 Pinata SDK (仅用于读取操作)
// 注意：对于只读操作，JWT 是可选的
export const pinata = new PinataSDK({
  pinataJwt: import.meta.env?.VITE_PINATA_JWT || "",
  pinataGateway: import.meta.env?.VITE_PINATA_GATEWAY || "gold-urgent-dove-253.mypinata.cloud",
});

/**
 * 从 Pinata/IPFS 获取数据 (只读操作)
 * @param cid 内容标识符
 * @returns 获取的数据
 */
export async function fetchFromPinata(cid: string) {
  try {
    const url = `https://${pinata.config.pinataGateway}/ipfs/${cid}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from Pinata: ${response.statusText}`);
    }
    
    // 尝试解析为 JSON，如果失败则返回文本
    try {
      const data = await response.json();
      return { success: true, data };
    } catch {
      const data = await response.text();
      return { success: true, data };
    }
  } catch (error) {
    console.error("Error fetching from Pinata:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// 移除写入相关的功能，因为我们只需要读取操作
export default {
  pinata,
  fetchFromPinata,
};