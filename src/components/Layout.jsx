import Navbar from "./Navbar";
// import Siderbar from "./Sidebar";

function Layout( { children, theme, setTheme, setIsAuth}) {

    return (

        <div style= {{ minHeight : "100vh", background: "var(--bg)"}}>
            <Navbar theme={theme} setTheme={setTheme} setIsAuth={setIsAuth}/>
            {/* <div style={{ display : "flex"}}>
                <Siderbar />
                <main style={{ flex : 1, padding: "2rem"}}>{children}</main>
            </div> */}
            <main style={{
                paddingTop:90,
                paddingLeft : "1.5rem",
                paddingRight : "1.5rem",
                paddingBottom: "2rem",
                maxWidth: 1400,
                margin : "0 auto"
            }}>
                {children}
            </main>

        </div>
    );
}

export default Layout ;