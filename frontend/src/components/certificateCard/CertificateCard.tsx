'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './certificateCard.module.css';

interface CertificateCardProps {
  title: string;
  imageSrc: string;
  price: number;
  onBuy: (price: number) => void;
}

export default function CertificateCard({ title, imageSrc, price, onBuy }: CertificateCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleBuyClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    onBuy(price);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.price}>{price.toLocaleString()} токенов</div>
          <button
            onClick={handleBuyClick}
            className={styles.button}
          >
            Получить сертификат
          </button>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCancel}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Подтверждение покупки</h3>
            <p className={styles.modalText}>
              Вы уверены, что хотите приобрести сертификат "{title}" за {price.toLocaleString()} токенов?
            </p>
            <div className={styles.modalButtons}>
              <button
                onClick={handleCancel}
                className={styles.cancelButton}
              >
                Отмена
              </button>
              <button
                onClick={handleConfirm}
                className={styles.confirmButton}
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
