import React, { useState, useEffect } from 'react';
import './Prayers.css';
import axios from 'axios';

const Prayers = () => {
    const [city, setCity] = useState("cairo"); // تعيين "cairo" كمدينة افتراضية
    const [prayers, setPrayers] = useState(null); // تخزين مواعيد الصلاة
    const [cityAr, setCityAr] = useState("القاهرة"); // تعيين "cairo" كمدينة افتراضية
    const [dateHijri, setDateHijri] = useState(""); // تخزين التاريخ
    const cities = [
        { val: "cairo", name: "القاهرة" },
        { val: "alexandria", name: "الإسكندرية" },
        { val: "giza", name: "الجيزة" },
        { val: "damietta", name: "دمياط" },
        { val: "aswan", name: "اسوان" },
        { val: "suez", name: "السويس" },
        { val: "Qalyoubia", name: "القليوبية" },
        { val: "Ismailia", name: "الإسماعيلية" },
    ];

    // عند تغيير المدينة، يتم استدعاء الـ API لعرض مواعيد الصلاة
    useEffect(() => {
        const url = `https://api.aladhan.com/v1/timingsByAddress?address=${city},Egypt&method=8`;
        axios.get(url)
            .then((response) => {
                setPrayers(response.data.data.timings);  // تخزين مواعيد الصلاة في state
                setDateHijri(response.data.data.date.hijri.date)
            })
            .catch((err) => {
                console.log("خطأ في جلب البيانات:", err);
            });
    }, [city]); // اعادة تحميل البيانات عند تغيير المدينة

    const handelClick = (e) => {
        setCity(e.target.value); // تحديث المدينة بناءً على الاختيار
        setCityAr(e.target.options[e.target.selectedIndex].text); // تحديث اسم المدينة بناءً على الاختيار
    };

    return (
        <div className='prayers'>
            <div className='left'>
                <h1>مواقيت الصلاة في {cityAr}</h1>
                <div className='prayer-times'>
                {prayers ? (
                <>
                    <h3>الفجر : {prayers.Fajr}</h3>
                    <h3>الشروق : {prayers.Sunrise}</h3>
                    <h3>الظهر : {prayers.Dhuhr}</h3>
                    <h3>العصر : {prayers.Asr}</h3>
                    <h3>المغرب : {prayers.Maghrib}</h3>
                    <h3>العشاء : {prayers.Isha}</h3>
                </>
                ) : (
                <p>جاري التحميل...</p>
            )}
                </div>
            {}
            <h2>التاريخ الهجري: {dateHijri}</h2>
            <h2>التاريخ الميلادي: {new Date().toLocaleDateString()}</h2>
            </div>
            <div className='prayer-content'>
                <div className='right'>
                    <label htmlFor="city">المدينة</label>
                    <select name="city" id="city" value={city} onChange={handelClick}>
                        {cities.map((city) => {
                            return <option key={city.val} value={city.val}>{city.name}</option>;
                        })}
                    </select>
                </div>
                
            </div>
        </div>
    );
};

export default Prayers;
