
const Alerta = ({alerta}) => {
  return (
   
      <div 
      className={`${alerta.error ? 'bg-transparent' : 'from-green-200 to-green-500'} absolute bg-transparent  bg-gradient-to-br text-center p-3 w-full uppercase text-red-500 font-bold text-sm mb-10`}
      
      >
          {alerta.msg}
      </div>
     
  )
};

export default Alerta;
