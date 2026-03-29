import React, { useState } from 'react';
import styles from './AudioModal.module.css';

export const AudioModal = ({ onStart }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Bienvenue</h2>
                <p>Souhaitez-vous activer l'expérience sonore pour une immersion totale ?</p>
                
                <div className={styles.buttonGroup}>
                    <button 
                        className={styles.startButton} 
                        onClick={() => onStart(true)}
                    >
                        Oui, avec son
                    </button>
                    <button 
                        className={styles.secondaryButton} 
                        onClick={() => onStart(false)}
                    >
                        Non, rester discret
                    </button>
                </div>
            </div>
        </div>
    );
};