import {Button, Grid} from "@mui/material";
import Page from "./components/common/page";
import PrivateRoute from "./components/common/privateRoute";
import {ReactComponent as SpotifyLogo} from "./images/spotify/SpotifyLogoNew.svg";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login";
import Spotify from "./pages/spotify/spotify";
import {useAuth, UserProvider} from "./utils/auth";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import Dashboard from "./pages/dashboard/dashboard";
import PresentationPage from "./pages/presentationPage";

function App() {
        return (
                    <Routes>
                        <Route exact path='/presentation' element={<PresentationPage/>}/>
                        {/*<Route exact path='/login' element={<Login/>}/>*/}
                        {/*<Route exact path='/spotify' element={<Spotify/>}/>*/}
                        {/*<Route exact path='/dashboard' element={<Dashboard/>}/>*/}
                        {/*<Route exact path='*' element={<Login/>}/>*/}

                        {/*<Route exact path='/logout' element={*/}
                        {/*    <Suspense fallback={<FullPageLoading />}>*/}
                        {/*        <LogoutComponent title="Logout" />*/}
                        {/*    </Suspense>*/}
                        {/*}/>*/}

                        {/*<Route exact path='/login' element={*/}
                        {/*    <Suspense fallback={<FullPageLoading />}>*/}
                        {/*        {loggedIn ? <Navigate to={'/dashboard'} /> : <LoginComponent title="Login" redirect={redirect}/>}*/}
                        {/*    </Suspense>*/}
                        {/*}/>*/}

                        {/*<Route exact path='/forgot' element={*/}
                        {/*    <Suspense fallback={<FullPageLoading />}>*/}
                        {/*        {loggedIn ? <Navigate to={'/dashboard'} /> : <ForgetComponent title="Forgot Password" />}*/}
                        {/*    </Suspense>*/}
                        {/*}/>*/}

                        {/*<Route exact path='/password/confirm/:uid/:token' element={*/}
                        {/*    <Suspense fallback={<FullPageLoading />}>*/}
                        {/*        <ConfirmPasswordComponent title="Confirm Password"/>*/}
                        {/*    </Suspense>*/}
                        {/*}/>*/}

                        {/*<Route exact path='/subscriptions' element={*/}
                        {/*    <Suspense fallback={<FullPageLoading />}>*/}
                        {/*        {loggedIn ? <SubscriptionComponent title="Prices"/> : <Navigate to={'/login'} />}*/}
                        {/*    </Suspense>*/}
                        {/*}/>*/}

                        {/*<Route exact path='/' element={*/}
                        {/*    loggedIn ? <Navigate to={'/dashboard'} /> : <HomePage />*/}
                        {/*} />*/}

                        {/*<Route path='/dashboard' element={*/}
                        {/*    <PrivateRoute component={DashboardComponent}*/}
                        {/*                  title="Dashboard"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/valuations' element={*/}
                        {/*    <PrivateRoute component={ValuationsComponent}*/}
                        {/*                  title="Valuations"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route exact path='/insights/:talentId' element={*/}
                        {/*    <PrivateRoute component={Insights}*/}
                        {/*                  title="Insights"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/my-media-kit' element={*/}
                        {/*    <PrivateRoute component={MediaKit}*/}
                        {/*                  title="Media Kit"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/affiliate-marketplace' element={*/}
                        {/*    <PrivateRoute component={AffiliateMarketplace}*/}
                        {/*                  title="Brand Affiliate Marketplace"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/affiliate-advertiser/:advertiserId' element={*/}
                        {/*    <PrivateRoute component={AffiliateMarketplaceAdvertiser}*/}
                        {/*                  title="Brand Affiliate Marketplace"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/calendar' element={*/}
                        {/*    <PrivateRoute component={Calendar}*/}
                        {/*                  title="Calendar"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/deal-tracker' element={*/}
                        {/*    <PrivateRoute component={dealTrackerComponent}*/}
                        {/*                  title="Brand Deals"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/partner-perks' element={*/}
                        {/*    <PrivateRoute component={PartnerPerksComponent}*/}
                        {/*                  title="Partner Perks"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/community' element={*/}
                        {/*    <PrivateRoute component={CommunityComponent}*/}
                        {/*                  title="Community"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/archived-deal-tracker' element={*/}
                        {/*    <PrivateRoute component={dealTrackerComponent}*/}
                        {/*                  title="Brand Deals"*/}
                        {/*                  relay={{status: 'archived'}}*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/add-deal' element={*/}
                        {/*    <PrivateRoute component={editDealComponent}*/}
                        {/*                  title="Brand Deals"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/edit-deal/:dealId' element={*/}
                        {/*    <PrivateRoute component={editDealComponent}*/}
                        {/*                  title="Brand Deals"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/creator-resources' element={*/}
                        {/*    <PrivateRoute component={CreatorResources}*/}
                        {/*                  title="Creator Resources"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/creator-coaching' element={*/}
                        {/*    <PrivateRoute component={CreatorCoaching}*/}
                        {/*                  title="Creator Coaching"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/business-documents' element={*/}
                        {/*    <PrivateRoute component={BusinessDocuments}*/}
                        {/*                  title="Business Documents"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/brand-deal-accelerator' element={*/}
                        {/*    <PrivateRoute component={BrandDealAccelerator}*/}
                        {/*                  title="Brand Deal Accelerator"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/my-account' element={*/}
                        {/*    <PrivateRoute component={MyAccount}*/}
                        {/*                  title="My Account"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/billing' element={*/}
                        {/*    <PrivateRoute component={Billing}*/}
                        {/*                  title="Billing"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/cancel-subscription' element={*/}
                        {/*    <PrivateRoute component={CancelSubscriptionComponent}*/}
                        {/*                  title="Cancel Subscription"*/}
                        {/*                  userRole={user_role}*/}
                        {/*                  permitedRoles={roles.CREATOR}/>*/}
                        {/*} />*/}

                        {/*<Route path='/business-docs' element={*/}
                        {/*    <Suspense fallback={<FullPageLoading/>}>*/}
                        {/*        <Page component={ContractTemplates} title={'Contract templates'}/>*/}
                        {/*    </Suspense>*/}
                        {/*}/>*/}

                        {/*<Route exact path='/profile/:customURL' element={*/}
                        {/*    <Suspense fallback={<FullPageLoading />}>*/}
                        {/*        <MediaKit />*/}
                        {/*    </Suspense>*/}
                        {/*} />*/}

                        {/*<Route element={*/}
                        {/*    <Suspense fallback={<FullPageLoading />}>*/}
                        {/*        <NotFound />*/}
                        {/*    </Suspense>*/}
                        {/*} />*/}
                    </Routes>
        );
}

export {App};
