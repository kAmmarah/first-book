import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'AI-Powered Personalization',
    Svg: require('@site/static/img/personalize-icon.svg').default,
    description: (
      <>
        Content adapts to your learning style and experience level with our 
        intelligent personalization system.
      </>
    ),
  },
  {
    title: 'Interactive Learning',
    Svg: require('@site/static/img/chat-icon.svg').default,
    description: (
      <>
        Engage with the material through our RAG-powered chatbot that can answer
        questions about any part of the book.
      </>
    ),
  },
  {
    title: 'Multilingual Support',
    Svg: require('@site/static/img/translate-icon.svg').default,
    description: (
      <>
        Read in your preferred language with one-click translation to Urdu and
        other languages.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{ animation: 'float 3s ease-in-out infinite' }}>
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3 style={{ 
          background: 'linear-gradient(135deg, var(--ifm-color-primary), #1e6b47)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          {title}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}