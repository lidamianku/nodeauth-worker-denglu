<div align="center">
  <img src="frontend/dist/logo.svg" width="96" alt="NodeAuth Logo" />
  <h1>NodeAuth</h1>


中文 | [English](README.EN.md)

支持 Cloudflare Serverless 与 Docker 私有化部署的高安全、轻量级二步验证 (2FA/TOTP) 管理工具


[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat&logo=cloudflare)](https://workers.cloudflare.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker&logoColor=white)](https://hub.docker.com/r/nodeauth/nodeauth-worker)
[![GitHub Actions](https://img.shields.io/badge/GitHub-Actions-181717?style=flat&logo=github)](https://github.com/nodeauth/nodeauth-worker/actions)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-red.svg)](https://www.gnu.org/licenses/agpl-3.0)

</div>


---

## 📖 项目部署

- [在线演示](https://demo.nodeauth.io)
- [部署文档](https://wiki.nodeauth.io)

---

## 📖 项目预览

<img height="222" src="https://github.com/user-attachments/assets/20ca3791-841b-4a89-bfe4-ffacfcc7ee9a" />

<img height="222" src="https://github.com/user-attachments/assets/632f5711-d6af-4c34-812a-1728d701ce27" />

---

## 🌟 项目优势

不管是白嫖 Cloudflare 的免费额度，还是部署在自家的 NAS 或小主机上，NodeAuth 都能为你提供**最安全**、最便捷的 2FA 密钥管理体验。

### 🕊️ 真正的“全方位”部署 (Dual-Mode)
*   **白嫖党最爱**：一键部署到 Cloudflare Workers，零成本、零维护、全球加速。
*   **私有云极客**：支持 Docker 部署，数据锁在自家硬盘里，局域网断网也能用。

### 📱 像原生 App 一样好用 (PWA)
*   **沉浸式体验**：支持安装到电脑桌面或手机主屏幕，没有浏览器边框的干扰。
*   **断网也不怕**：得益于先进的离线缓存技术，即便在地下室或飞机上（无网络），它依然能秒开并为你生成精准的验证码。

### 🛡️ “拉闸式”安全护卫 (Health Shield)
*   我们内置了智能安检逻辑。如果程序检测到关键密钥丢失或配置不当，它会立即“拉闸”阻断访问，防止你的数据因环境不安全而暴露。

### 📦 丢不了的“后悔药” (Multi-channel Backup)
*   支持 Email、WebDAV、S3 云存储或 Telegram 机器人自动备份。即使手机丢了、系统重装了，甚至 Cloudflare 账号没了，你也能通过备份瞬间找回所有账号。

---

## 🛡 深度安全审计 (Security Auditing)

[**点击查看由 GitHub Actions 自动生成的安全审计报告**](https://github.com/nodeauth/nodeauth-worker/blob/security-audit/README.md)

---

## 📄 开源协议
本项目基于 [GNU AGPL v3](LICENSE) 协议开源。作为一款涉及 2FA 安全与网络服务的软件，我们坚持维护开源社区的公平性：如果您在服务器上运行本项目的修改版本并向公众提供服务，您必须向用户开放您的源代码。
