const crypto = require('crypto');

module.exports = {
    async beforeCreate(event) {
        console.log('beforeCreate is working...', event.params.data);
        
        // เพิ่มการเข้ารหัสค่า mobile โดยใช้ SHA-256 อยากได้เท่าไหร่ก็ใส่เกลือเอา แค่นั้นแหละ*0*
        const hashedMobile = crypto.createHash('sha512').update(event.params.data.mobile).digest('hex');
        event.params.data.mobile = hashedMobile;
        return event; // ส่งข้อมูลที่ถูกปรับแก้ไขกลับไปยัง Sequelize
    }
};
// ฟังก์ชันสำหรับแสดงตัวเลขที่ถูกเข้ารหัส
function displayHashedMobile(hashedMobile) {
    // ทำตามความเหมือนหลังจากการเข้ารหัส (hashed) ไม่สามารถถอดรหัสกลับได้
    // แต่เพื่อแสดงตัวอย่างเท่านั้น
    return hashedMobile.substring(0, 6) + '*****'; // แสดงตัวอย่าง 6 ตัวแรกและเครื่องหมาย * หลังจากนั้น
}

// ตัวอย่างการเรียกใช้ฟังก์ชัน
const hashedMobile = "f9635b4619fdf3006bf500c7b0a21f5c1b91f80b3bf525afe96614d666778956d8fc666d7a0d421d6b5f355ec76a428a9fa131b5ab57d1bbf8631cc770c587b2";
const displayedMobile = displayHashedMobile(hashedMobile);
console.log(displayedMobile);

