import orderDetailsStyle from './order-details.module.css';
import orderStatusImage from '../../images/graphics.svg'

const OrderDetails = () => {
  return(
    <div className={orderDetailsStyle.container}>
      <p className='mt-4 mb-8 text text_type_digits-large'>034536</p>
      <p className='mb-15 text text_type_main-medium'>идентификатор заказа</p>
      <img className={orderDetailsStyle.image} src={orderStatusImage} alt='галочка подтверждения заказа'></img>
      <p className='mt-15 mb-2 text text_type_main-default'>Ваш заказ начали готовить</p>
      <p className='mb-15 text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>  
  )    
}

//  пропсов пока нет, не надо валидировать  //

export default OrderDetails;