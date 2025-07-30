import ArtistRegistrationForm from '@/components/forms/ArtistRegistrationForm';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { useAuth } from '@/hooks/use-auth';
import { Navigate } from 'react-router-dom';

const ArtistRegistration = () => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <Navigate to="/auth?redirect=/artist-registration" replace />;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
                <div className="container py-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8">Become an AI Music Artist</h1>
                        <ArtistRegistrationForm />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ArtistRegistration;
