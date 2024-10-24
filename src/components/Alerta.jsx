
const Alerta = ({alerta}) => {
  return (
   
      <div 
      className={`${alerta.error ? 'bg-transparent' : 'from-indigo-400 to-indigo-600'} absolute bg-transparent  bg-gradient-to-br text-center p-3 rounded-xl uppercase text-red-500 font-bold text-sm mb-10`}
      
      >
          {alerta.msg}
      </div>
     
  )
};

export default Alerta;
