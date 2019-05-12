import  { Component, Prop, State, Method } from '@stencil/core';

@Component({
    tag: 'side-drawer',
    styleUrl: 'side-drawer.css',
    shadow:true
})
export class SideDrawer {
    /** create property to get data outside the comppponent 
     *  if the title changed you will render only change DOM
     *  reflectToAttr =>  to configre attrubite changed 
    */
    @Prop({reflectToAttr:true}) title: string;

    /** 
     * the prop in default are im
     * mutable => use mutable becouse the attribute can't be changed inside 
     * Becouse use uni-direaction data flow
     *
     * */
    @Prop({reflectToAttr:true, mutable:true}) opened: boolean; // to set in side-drawer tag to opened menu
    /**
     *  state to get value outside component && inside component
     */
    @State() showContactInfo = false;

    /**
     * to create method inside component 
     */
    @Method()
    open(){
        this.opened = true;
    }
    /**
     *  to close drawer 
     */
    onCloseDrawer(){
        this.opened = false;
    }

    /** 
     * onContantChange runing in swip tabs
     * @param string content  nav - contact
    */
    onContantChange(content: string){
        console.log(".... onContentChange ....");
        console.log(content);
        this.showContactInfo = content === 'conatct';
        console.log(this.showContactInfo );
        console.log(".........................");

    }
    render() {
        let mainContent = <slot/>;
        if(this.showContactInfo){
             mainContent = (
                    <div id="contact-information">
                        <h2> Conatct Info</h2>
                        <p>You can reach us via phone or email .</p>
                        <ul>
                            <li>Phone : +20 01282434860</li>
                            <li>Email <a href="mailto:mr.mohamedabdelaziz@gmail.com">Mohamedabdelaziz</a></li>
                        </ul>
                    </div>
                );
        }
            return[
                <div class="backdrop"/>,
                <aside>
                    <header> 
                        <h1> {this.title} </h1> 
                        <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                    </header>
                    <section id="tabs">
                        <button class={!this.showContactInfo ?'active':''}                       
                                 onClick = { this.onContantChange.bind(this,'nav')}>Navigation</button>
                        <button class={this.showContactInfo ?'active':''}
                                onClick = {this.onContantChange.bind(this,'conatct')}>Contact</button>
                    </section>
                    <main>
                        {/* <slot/> */}
                        {mainContent}
                    </main>
                </aside>
            ]; 
      
    }
     
    /**
     * render is function 
     * turned on in web component by stencil
     * excude the parse html into component
     *  @version 1 using opened attruibte to opened side-drawer 
     */
    // render() {
    //     let content = null;
    //     if(this.opened){
    //         content =  (
    //             <aside>
    //                 <header> <h1> {this.title} </h1> </header>
    //                 <main>
    //                     <slot/>
    //                 </main>
    //             </aside>
    //         ); 
    //     }
    //     return content; 
    // }
}

