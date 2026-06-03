import LandingLayout, { LangContext } from '@/layouts/LandingLayout';

export default function Analytics() {
    return (
        <LandingLayout title="Ctechbooth - Analytics">
            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="blue-gradient-text">Analytics</span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            Coming soon - Advanced analytics dashboard
                        </p>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}