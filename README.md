//STEVEN LECTURE NOTES
//router: give it what route you want it to hit, and what you want it to render
//do you have all routes in app.js? not always, you can write nested routes but all basic main pages usually have a place in app in Switch
//see 23:00 into the 051319 lecture about if you want something to appear on every page that starts with /adopter or /admin (so nav bar probably), then don't use exact path and put it all in /adopter, which would be under /adopter/dogs. If you only want very specific things to be on /adopter and nowhere else, then use exact path="/adopter"
//Switch works the same as calling everything exact path=, but remember order matters so '/' would have to be at the very bottom which sort of doesn't make sense to me since it's basically the first page of the app. 
//Switch will only render one route at a time! Use it at top level of all routes to switch between the major pages (28:31)
//How are all these routes going to work when I have auth? Will I need the switch or will i use the ProtectedRoute component to route to either splash or admin/adopter and write switch routes elsewhere?

//ROUTER PROPS
//match has params
//if using render in Route, then pass props render={(routerProps) => <Splash handleLogin={this.handleLogin} {...routerProps} />}/>


### Redux + React 042219
1:20:00 ish is when he talks about passing args to mdp as payload