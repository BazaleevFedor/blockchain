import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack(config) {
        config.resolve.alias['@contracts'] = path.resolve(__dirname, '../contracts/build/contracts');
        return config;
    }
};

export default nextConfig;
