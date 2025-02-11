import { motion } from 'framer-motion';
import Image from 'next/image';

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <Image src="/images/icon.png" alt="Logo" width={90} height={90} />
        </p>
        <p>
          <strong>Genrivia</strong> is a healthcare AI designed to generate personalized health and wellness plans. I analyze user-provided health data to create customized recommendations for diet, exercise, mental health, and general well-being. Basically, I&apos;m here to get you in top shape!
        </p>
      </div>
    </motion.div>
  );
};
