import { PizzasService } from './incidents.service';
import { ToppingsService } from './toppings.service';

export const services: any[] = [PizzasService, ToppingsService];

export * from './incidents.service';
export * from './toppings.service';
