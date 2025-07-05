import React from 'react'

const SIgnUp = () => {
  return (
   
    <main className="p-5">
        <section className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <article className="card">
                        <header className="text-center">
                            <h1 className='card-title'>Sign In</h1>
                        </header>
                            <div className="card-body">
                                <form action="">
                                    <div className='row'>
                                        <div className='col-md-6'>
                                           
                                            <input 
                                            type="text"
                                            className='form-control shadow'
                                            placeholder='First Name'
                                            
                                             />
                                        </div>
                                        
                                        <div className='col-md-6'>
                                          <input 
                                          type="text"
                                          className='form-control shadow'
                                          placeholder='Last Name'
                                           />
                                        </div>
                                    </div>
                                    <div></div>
                                    <div></div>
                                </form>
                            </div>
                        
                    </article>
                </div>
            </div>
        </section>
    </main>
  )
}

export default SIgnUp
