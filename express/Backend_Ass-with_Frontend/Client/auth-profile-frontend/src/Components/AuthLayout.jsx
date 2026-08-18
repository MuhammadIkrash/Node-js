const AuthLayout = ({
    title,
    subtitle,
    children
}) => {

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="logo">
                    <div className="logo-icon">
                        A
                    </div>

                    <div>
                        <h2>AuthFlow</h2>
                        <span>Secure Authentication</span>
                    </div>
                </div>

                <div className="auth-heading">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>

                {children}

            </div>

        </div>
    );
};

export default AuthLayout;