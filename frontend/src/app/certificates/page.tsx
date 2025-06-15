'use client';

import React from 'react';
import CertificateCard from '@/components/certificateCard/CertificateCard';

import styles from './certificatesPage.module.css';
import Ajax from "@/app/ajax";
import {useRouter} from "next/router";

const certificates = [
    {
        title: 'поц для тестирования',
        imageSrc: '/6.jpg',
        price: 50,
    },
    {
        title: 'Нормис Нейро-Ученик',
        imageSrc: '/4.jpg',
        price: 10000,
    },
    {
        title: 'Мастер Блокчейн-Дзен',
        imageSrc: '/2.jpg',
        price: 20000,
    },
    {
        title: 'Крипто-Волшебник',
        imageSrc: '/3.jpg',
        price: 50000,
    },
    {
        title: 'Гуру-Кенгуру',
        imageSrc: '/5.jpg',
        price: 100000,
    },
];

const generateCertificate = async (userName: string, imageSrc: string) => {
    const canvas = document.getElementById('certificateCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const backgroundImage = new Image();
    backgroundImage.src = imageSrc;

    const padding = 10;

    backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#000'; // цвет текста
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        ctx.fillText(`СЕРТИФИКАТ ВЫДАН: ${userName}`, padding, padding);

        ctx.font = '16px Arial';
        ctx.fillText('«Поц для тестирования»', padding, padding + 30);

        ctx.font = '16px Arial';
        ctx.fillText(
            'За успешное выполнение заданий на платформе SkillChain',
            padding,
            padding + 60,
        );

        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
}

export default function CertificatesPage() {
    const handleBuyCertificate = (price: number) => {
        Ajax.deductFromUser(price).then(async () => {
            console.log(`Покупка сертификата за ${price} токенов`);

            const imageSrc = certificates.find((certificate) => certificate.price === price)?.imageSrc;
            await generateCertificate(await Ajax.getUserAddress() || '', imageSrc || '');

            useRouter().push('/');
        }).catch((e) => {
            console.error(`Ошибка покупки ${e}`);
        });
    };

    return (
        <div className={styles.certificatesPage}>
            <h1 className={styles.title}>certificates</h1>

            <div className={styles.certificates}>
                {certificates.map((certificate, index) => (
                    <CertificateCard key={index} title={certificate.title} imageSrc={certificate.imageSrc}
                                     price={certificate.price} onBuy={handleBuyCertificate}/>
                ))}
            </div>

            <canvas id="certificateCanvas" width="1200" height="800" style={{ display: 'none' }}></canvas>
        </div>
    );
}
